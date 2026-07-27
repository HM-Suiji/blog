---
name: write-blog
description: Write a blog post with agent-browser and pagesCMS
---

# Write a blog post with agent-browser and pagesCMS

## Description

Write a blog post with agent-browser and pagesCMS

## Usage

1. Start agent-browser and link to PagesCMS with CDP mode

```bash
agent-browser --cdp 3764 open https://app.pagescms.org/hm-suiji/blog/main/collection/posts/new
```

2. Get the snapshot to bind the form target

```bash
agent-browser --cdp 3764 snapshot -i
```

The code will be like this(Your code may be different):

```bash
- button "HM-Suiji blog main" [expanded=false, ref=e6]
- link "博客文章" [ref=e11]
- link "Media" [ref=e12]
- link "Actions" [ref=e13]
- link "Collaborators" [ref=e14]
- link "Configuration" [ref=e15]
- button "Suiji" [expanded=false, ref=e2]
- button "About Pages CMS" [expanded=false, ref=e3]
- navigation "breadcrumb" [ref=e4]
  - link "博客文章" [ref=e21]
  - link "New entry" [disabled, ref=e22]
- button "Save" [ref=e5]
- textbox "Slug" [ref=e7]
- textbox "标题" [ref=e8]
- textbox "描述" [ref=e9]
- spinbutton "年" [ref=e23]: 2026
- spinbutton "月" [ref=e24]: 7
- spinbutton "日" [ref=e25]: 27
- button "显示日期选择器" [ref=e16]
- button "Add an item" [ref=e10]
- switch "置顶" [checked=false, ref=e17]
- switch "公开" [checked=true, ref=e18]
- button "Upload" [ref=e19]
- button "Select" [expanded=false, ref=e20]
- textbox [ref=e26]:

- region "Notifications alt+T" [ref=e1]
```

3. Write a blog post with agent-browser

- Write the slug

```bash
agent-browser --cdp 3764 fill e7 "blog-slug"
```

- Write the title

```bash
agent-browser --cdp 3764 fill e8 "blog-title"
```

- Write the description

```bash
agent-browser --cdp 3764 fill e9 "blog-description"
```

- Write the items(Tags)

```bash
agent-browser --cdp 3764 click e10
agent-browser --cdp 3764 fill e11 "blog-tag1"
# if there are multiple tags, repeat the following steps
agent-browser --cdp 3764 snapshot -i
agent-browser --cdp 3764 click e13
agent-browser --cdp 3764 fill e14 "blog-tag2"
```

- Write the content

```bash
agent-browser --cdp 3764 fill e32 "blog-content"
```

- Save the blog post

```bash
agent-browser --cdp 3764 click e5
```

- Close the agent-browser

```bash
agent-browser --cdp 3764 close
```
