'use client'

import { useEffect, useState } from 'react'

import { Plane, TrainFront } from 'lucide-react'
import {
  setWorkerUrl,
  type ExpressionSpecification,
  type FilterSpecification,
} from 'maplibre-gl'
import Image from 'next/image'

import { Map, useMap } from '@heroui-pro/react/map'
import { Button, Card, Chip } from '@heroui/react'

import {
  journeyRoutes,
  journeyStops,
  type JourneyStop,
  type JourneyTransport,
} from '@/config/journey'

setWorkerUrl('/vendor/maplibre/maplibre-gl-worker.mjs')

const stopById = new globalThis.Map(journeyStops.map(stop => [stop.id, stop]))

function getArcMidpoint(
  from: [number, number],
  to: [number, number],
  curvature: number
): [number, number] {
  const deltaLongitude = to[0] - from[0]
  const deltaLatitude = to[1] - from[1]

  return [
    (from[0] + to[0]) / 2 - (deltaLatitude * curvature) / 2,
    (from[1] + to[1]) / 2 + (deltaLongitude * curvature) / 2,
  ]
}

const routeSegments = journeyRoutes.flatMap(route => {
  const fromStop = stopById.get(route.from)
  const toStop = stopById.get(route.to)

  if (!fromStop || !toStop) return []

  const from: [number, number] = [fromStop.longitude, fromStop.latitude]
  const to: [number, number] = [toStop.longitude, toStop.latitude]

  return [
    {
      ...route,
      from,
      fromStop,
      midpoint: getArcMidpoint(from, to, route.curvature),
      to,
      toStop,
    },
  ]
})

const journeyBounds: [[number, number], [number, number]] = [
  [
    Math.min(...journeyStops.map(stop => stop.longitude)),
    Math.min(...journeyStops.map(stop => stop.latitude)),
  ],
  [
    Math.max(...journeyStops.map(stop => stop.longitude)),
    Math.max(...journeyStops.map(stop => stop.latitude)),
  ],
]

const mapStyle = 'https://tiles.openfreemap.org/styles/liberty'

const transportContent: Record<
  JourneyTransport,
  {
    color: string
    icon: typeof Plane
    label: string
  }
> = {
  flight: { color: '#2563eb', icon: Plane, label: '飞机' },
  train: { color: '#ea580c', icon: TrainFront, label: '火车' },
}

const allCityFilter: FilterSpecification = [
  'all',
  ['==', ['get', 'class'], 'city'],
  ['!=', ['get', 'capital'], 2],
]

const priorityCityFilter: FilterSpecification = [
  'all',
  ['==', ['get', 'class'], 'city'],
  ['!=', ['get', 'capital'], 2],
  [
    'any',
    ['<=', ['coalesce', ['get', 'rank'], 99], 4],
    [
      'match',
      [
        'coalesce',
        ['get', 'name:zh-Hans'],
        ['get', 'name:zh'],
        ['get', 'name'],
      ],
      ['深圳', '厦门', '青岛', '苏州', '大连', '香港', '澳门'],
      true,
      false,
    ],
  ],
]

const chinesePlaceName: ExpressionSpecification = [
  'coalesce',
  ['get', 'name:zh-Hans'],
  ['get', 'name:zh'],
  ['get', 'name'],
]

function JourneyMapLabelPolicy() {
  const { isLoaded, map } = useMap()

  useEffect(() => {
    if (!isLoaded || !map) return

    const updateCityDensity = () => {
      map.setFilter(
        'label_city',
        map.getZoom() >= 8 ? allCityFilter : priorityCityFilter
      )
    }

    const placeLabelLayers = [
      'label_other',
      'label_village',
      'label_town',
      'label_state',
      'label_city',
      'label_city_capital',
      'label_country_1',
      'label_country_2',
      'label_country_3',
    ]

    for (const layerId of placeLabelLayers) {
      if (map.getLayer(layerId)) {
        map.setLayoutProperty(layerId, 'text-field', chinesePlaceName)
      }
    }

    if (map.getLayer('label_other')) {
      map.setLayerZoomRange('label_other', 13, 24)
    }
    if (map.getLayer('label_town')) {
      map.setLayerZoomRange('label_town', 11, 24)
    }
    if (map.getLayer('label_village')) {
      map.setLayerZoomRange('label_village', 13, 24)
    }

    updateCityDensity()
    map.on('zoomend', updateCityDensity)

    return () => {
      map.off('zoomend', updateCityDensity)
    }
  }, [isLoaded, map])

  return null
}

function JourneyMapViewport() {
  const { isLoaded, map } = useMap()

  useEffect(() => {
    if (!isLoaded || !map) return

    const isCompact = map.getContainer().clientWidth < 640

    map.fitBounds(journeyBounds, {
      duration: 0,
      maxZoom: 4.75,
      padding: isCompact ? 44 : 64,
    })
  }, [isLoaded, map])

  return null
}

const statusContent = {
  origin: { label: '起点', color: 'success' },
  visited: { label: '到访', color: 'success' },
  planned: { label: '下一站', color: 'accent' },
} as const

const markerColor = {
  origin: '#16a34a',
  visited: '#111827',
  planned: '#7c3aed',
} as const

function JourneyDate({ stop }: { stop: JourneyStop }) {
  if (!stop.startDate) {
    return <span>{stop.dateLabel}</span>
  }

  if (!stop.endDate) {
    return <time dateTime={stop.startDate}>{stop.dateLabel}</time>
  }

  const [startLabel, endLabel] = stop.dateLabel.split(' — ')

  return (
    <span>
      <time dateTime={stop.startDate}>{startLabel}</time>
      <span aria-hidden="true"> — </span>
      <time dateTime={stop.endDate}>{endLabel}</time>
    </span>
  )
}

export function JourneyExplorer() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selectedStop = journeyStops.find(stop => stop.id === selectedId) ?? null
  const selectedTransport = selectedStop?.transport
    ? transportContent[selectedStop.transport]
    : null
  const SelectedTransportIcon = selectedTransport?.icon

  return (
    <div className="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.75fr)]">
      <Card
        className="h-[440px] overflow-hidden p-0 sm:h-[540px] lg:sticky lg:top-20 lg:h-[620px]"
        data-lenis-prevent-wheel
      >
        <Map
          center={[111.4, 29.1]}
          mapStyle={mapStyle}
          maxZoom={14}
          minZoom={3}
          scrollZoom
          zoom={4.25}
        >
          <JourneyMapLabelPolicy />
          <JourneyMapViewport />

          {routeSegments.map(route => {
            const transport = transportContent[route.transport]
            const isPlanned = route.status === 'planned'

            return (
              <Map.Arc
                key={route.id}
                beforeId="waterway_line_label"
                curvature={route.curvature}
                data={[{ id: route.id, from: route.from, to: route.to }]}
                hoverPaint={{
                  'line-opacity': 1,
                  'line-width': 5,
                }}
                id={`journey-${route.id}`}
                paint={{
                  'line-color': isPlanned ? '#7c3aed' : transport.color,
                  'line-opacity': isPlanned ? 0.75 : 0.86,
                  'line-width': route.transport === 'flight' ? 3.5 : 3,
                  ...(isPlanned ? { 'line-dasharray': [2, 2] } : {}),
                }}
                onClick={() => setSelectedId(route.toStop.id)}
              />
            )
          })}

          {routeSegments.map(route => {
            const transport = transportContent[route.transport]
            const TransportIcon = transport.icon
            const isPlanned = route.status === 'planned'

            return (
              <Map.Marker
                key={`${route.id}-transport`}
                latitude={route.midpoint[1]}
                longitude={route.midpoint[0]}
                onClick={() => setSelectedId(route.toStop.id)}
              >
                <Map.MarkerContent>
                  <span
                    className="flex size-7 cursor-[var(--cursor-interactive)] items-center justify-center rounded-full border-2 border-white text-white shadow-md"
                    style={{
                      backgroundColor: isPlanned ? '#7c3aed' : transport.color,
                    }}
                  >
                    <TransportIcon aria-hidden="true" className="size-3.5" />
                  </span>
                </Map.MarkerContent>
                <Map.MarkerTooltip>
                  <span className="font-medium">
                    {route.fromStop.city} → {route.toStop.city}
                  </span>
                  <span className="ml-1 text-background/70">
                    · {isPlanned ? `计划${transport.label}` : transport.label}
                  </span>
                </Map.MarkerTooltip>
              </Map.Marker>
            )
          })}

          {journeyStops.map((stop, index) => {
            const isSelected = stop.id === selectedStop?.id

            return (
              <Map.Marker
                key={stop.id}
                latitude={stop.latitude}
                longitude={stop.longitude}
                onClick={() => setSelectedId(stop.id)}
              >
                <Map.MarkerContent>
                  <span
                    className={`flex size-8 cursor-[var(--cursor-interactive)] items-center justify-center rounded-full border-2 border-white text-[11px] font-semibold text-white tabular-nums shadow-md transition-transform ${isSelected ? 'scale-110 shadow-lg' : ''}`}
                    style={{ backgroundColor: markerColor[stop.status] }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <Map.MarkerLabel position={index % 2 ? 'bottom' : 'top'}>
                    {stop.id === 'swjtu-2026' ? '交大' : stop.city}
                  </Map.MarkerLabel>
                </Map.MarkerContent>
                <Map.MarkerTooltip>
                  <span className="font-medium">{stop.place}</span>
                  <span className="ml-1 text-background/70">
                    {stop.dateLabel}
                  </span>
                </Map.MarkerTooltip>
              </Map.Marker>
            )
          })}

          {selectedStop ? (
            <Map.Popup
              closeButton
              closeOnClick={false}
              focusAfterOpen={false}
              latitude={selectedStop.latitude}
              longitude={selectedStop.longitude}
              offset={24}
              onClose={() => setSelectedId(null)}
            >
              <div className="space-y-1 pr-4 text-xs">
                <p className="font-semibold">{selectedStop.place}</p>
                <p className="text-muted tabular-nums">
                  {selectedStop.dateLabel}
                </p>
                {selectedTransport && SelectedTransportIcon ? (
                  <p className="flex items-center gap-1.5 font-medium">
                    <SelectedTransportIcon
                      aria-hidden="true"
                      className="size-3.5"
                      style={{ color: selectedTransport.color }}
                    />
                    {selectedTransport.label}抵达
                  </p>
                ) : null}
                <p className="text-muted">{selectedStop.note}</p>
              </div>
            </Map.Popup>
          ) : null}

          <Map.Controls>
            <Map.ZoomControl />
            <Map.CompassControl />
            <Map.FullscreenControl />
          </Map.Controls>
        </Map>

        <div className="pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-3 rounded-2xl bg-overlay/90 px-3 py-2 text-xs font-medium text-foreground shadow-sm backdrop-blur-md">
          <span>{journeyStops.length} 个地点</span>
          {(['flight', 'train'] as const).map(transport => {
            const item = transportContent[transport]
            const TransportIcon = item.icon
            const count = routeSegments.filter(
              route => route.transport === transport
            ).length

            return (
              <span key={transport} className="flex items-center gap-1">
                <TransportIcon
                  aria-hidden="true"
                  className="size-3.5"
                  style={{ color: item.color }}
                />
                {count} 段{item.label}
              </span>
            )
          })}
        </div>
      </Card>

      <section aria-labelledby="journey-log-title" className="min-w-0">
        <div className="mb-4 flex items-end justify-between gap-4 px-1">
          <div>
            <h2 id="journey-log-title" className="text-lg font-semibold">
              旅程记录
            </h2>
            <p className="text-muted mt-1 text-sm">点击地点，在地图上找到它</p>
          </div>
          <span className="text-muted text-xs tabular-nums">2023 — 至今</span>
        </div>

        <ol className="flex flex-col gap-2">
          {journeyStops.map((stop, index) => {
            const isSelected = stop.id === selectedStop?.id
            const status = statusContent[stop.status]
            const transport = stop.transport
              ? transportContent[stop.transport]
              : null
            const TransportIcon = transport?.icon

            return (
              <li key={stop.id}>
                <Button
                  aria-label={`在地图上查看${stop.place}，${stop.dateLabel}`}
                  className="h-auto w-full justify-start rounded-2xl p-0 text-left"
                  variant={isSelected ? 'secondary' : 'ghost'}
                  onPress={() => setSelectedId(stop.id)}
                >
                  <span className="flex w-full items-start gap-4 p-4">
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl text-xs font-semibold tabular-nums ${
                        isSelected
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-surface-secondary text-muted'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-muted text-xs tabular-nums">
                          <JourneyDate stop={stop} />
                        </span>
                        {transport && TransportIcon ? (
                          <span
                            className="flex items-center gap-1 text-xs font-medium"
                            style={{ color: transport.color }}
                          >
                            <TransportIcon
                              aria-hidden="true"
                              className="size-3.5"
                            />
                            {transport.label}
                          </span>
                        ) : null}
                        {stop.status !== 'visited' ? (
                          <Chip color={status.color} size="sm" variant="soft">
                            <Chip.Label>{status.label}</Chip.Label>
                          </Chip>
                        ) : null}
                      </span>
                      <span className="mt-2 block text-base font-semibold text-foreground">
                        {stop.place}
                      </span>
                      <span className="text-muted mt-1 block text-sm leading-5">
                        {stop.note}
                      </span>
                    </span>

                    {stop.image ? (
                      <span className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                        <Image
                          fill
                          alt={stop.image.alt}
                          className="object-cover"
                          sizes="64px"
                          src={stop.image.src}
                        />
                      </span>
                    ) : null}
                  </span>
                </Button>
              </li>
            )
          })}
        </ol>
      </section>
    </div>
  )
}
