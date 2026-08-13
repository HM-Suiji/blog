'use client'

import type { SortDescriptor } from '@heroui/react'

import { useMemo, useState } from 'react'

import { Check, Pencil, Trash } from 'lucide-react'

import {
  Avatar,
  Button,
  Chip,
  Input,
  ListBox,
  Popover,
  Select,
  Table,
} from '@heroui/react'

import { deleteFriend, updateFriendInfo } from '@/server/actions/friend.mutate'
import { Friend } from '@/types/friend'

const statusColorMap: Record<string, 'success' | 'danger' | 'warning'> = {
  active: 'success',
  inactive: 'warning',
  disapproved: 'danger',
}

const categoryOptions = [
  { id: 'tech', name: 'tech' },
  { id: 'own', name: 'own' },
  { id: 'offline', name: 'offline' },
  { id: 'other', name: 'other' },
]

const statusOptions = [
  { id: 'active', name: 'active' },
  { id: 'inactive', name: 'inactive' },
  { id: 'deleted', name: 'deleted' },
  { id: 'pending', name: 'pending' },
  { id: 'disapproved', name: 'disapproved' },
]

export function FriendsTable({ friends }: { friends: Friend[] }) {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'name',
    direction: 'ascending',
  })

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<Partial<Friend>>({})

  const sortedFriends = useMemo(() => {
    return [...friends].sort((a, b) => {
      const col = sortDescriptor.column as keyof Friend
      const first = String(a[col])
      const second = String(b[col])
      let cmp = first.localeCompare(second)

      if (sortDescriptor.direction === 'descending') {
        cmp *= -1
      }

      return cmp
    })
  }, [sortDescriptor])

  const handleEdit = (friend: Friend) => {
    setEditingId(friend.id)
    setEditValues({
      name: friend.name,
      link: friend.link,
      avatar: friend.avatar,
      description: friend.description,
      category: friend.category,
      status: friend.status,
    })
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditValues({})
  }

  const handleSave = async () => {
    if (!editingId) return

    await updateFriendInfo(editingId, {
      name: editValues.name,
      link: editValues.link,
      avatar: editValues.avatar,
      description: editValues.description,
      category: editValues.category as Friend['category'],
      status: editValues.status as Friend['status'],
    })

    setEditingId(null)
    setEditValues({})
  }

  const updateField = (field: keyof Friend, value: string) => {
    setEditValues(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Table with custom cells"
          className="min-w-200"
          selectionMode="single"
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
        >
          <Table.Header>
            <Table.Column allowsSorting id="name" isRowHeader>
              {({ sortDirection }) => (
                <Table.SortableColumnHeader sortDirection={sortDirection}>
                  Member
                </Table.SortableColumnHeader>
              )}
            </Table.Column>
            <Table.Column allowsSorting id="category">
              {({ sortDirection }) => (
                <Table.SortableColumnHeader sortDirection={sortDirection}>
                  Category
                </Table.SortableColumnHeader>
              )}
            </Table.Column>
            <Table.Column allowsSorting id="status">
              {({ sortDirection }) => (
                <Table.SortableColumnHeader sortDirection={sortDirection}>
                  Status
                </Table.SortableColumnHeader>
              )}
            </Table.Column>
            <Table.Column className="text-end">Actions</Table.Column>
          </Table.Header>
          <Table.Body>
            {sortedFriends.map(friend => {
              const isEditing = editingId === friend.id

              return (
                <Table.Row key={friend.id} id={friend.id}>
                  <Table.Cell>
                    {isEditing ? (
                      <div className="flex items-center gap-3">
                        <Avatar size="sm">
                          <Avatar.Image src={editValues.avatar} />
                          <Avatar.Fallback>
                            {(editValues.name ?? '')
                              .split(' ')
                              .map(n => n[0])
                              .join('')}
                          </Avatar.Fallback>
                        </Avatar>
                        <div className="flex flex-col gap-1">
                          <Input
                            value={editValues.name ?? ''}
                            onChange={e => updateField('name', e.target.value)}
                          />
                          <Input
                            value={editValues.link ?? ''}
                            onChange={e => updateField('link', e.target.value)}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Avatar size="sm">
                          <Avatar.Image src={friend.avatar} />
                          <Avatar.Fallback>
                            {friend.name
                              .split(' ')
                              .map(n => n[0])
                              .join('')}
                          </Avatar.Fallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-xs">{friend.name}</span>
                          <span className="text-xs text-muted">
                            {friend.link}
                          </span>
                        </div>
                      </div>
                    )}
                  </Table.Cell>
                  <Table.Cell className="min-w-52">
                    {isEditing ? (
                      <Select
                        value={editValues.category}
                        onChange={value =>
                          updateField('category', value as string)
                        }
                      >
                        <Select.Trigger className="min-w-32">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            {categoryOptions.map(opt => (
                              <ListBox.Item
                                key={opt.id}
                                id={opt.id}
                                textValue={opt.name}
                              >
                                {opt.name} <ListBox.ItemIndicator />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    ) : (
                      friend.category
                    )}
                  </Table.Cell>
                  <Table.Cell className="min-w-25">
                    {isEditing ? (
                      <Select
                        value={editValues.status}
                        onChange={value =>
                          updateField('status', value as string)
                        }
                      >
                        <Select.Trigger className="min-w-32">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            {statusOptions.map(opt => (
                              <ListBox.Item
                                key={opt.id}
                                id={opt.id}
                                textValue={opt.name}
                              >
                                {opt.name} <ListBox.ItemIndicator />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    ) : (
                      <Chip
                        color={statusColorMap[friend.status]}
                        size="sm"
                        variant="soft"
                      >
                        {friend.status}
                      </Chip>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-1">
                      {isEditing ? (
                        <>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="primary"
                            onPress={handleSave}
                          >
                            <Check />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="tertiary"
                            onPress={handleCancel}
                          >
                            <Pencil />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="tertiary"
                            onPress={() => handleEdit(friend)}
                          >
                            <Pencil />
                          </Button>
                          <Popover>
                            <Button isIconOnly size="sm" variant="danger-soft">
                              <Trash />
                            </Button>
                            <Popover.Content>
                              <Popover.Dialog className="flex gap-2 flex-col">
                                <p>确认要删除{friend.name}的友链吗？</p>
                                <Button
                                  onPress={() => deleteFriend(friend.id)}
                                  variant="danger-soft"
                                >
                                  确认
                                </Button>
                              </Popover.Dialog>
                            </Popover.Content>
                          </Popover>
                        </>
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  )
}
