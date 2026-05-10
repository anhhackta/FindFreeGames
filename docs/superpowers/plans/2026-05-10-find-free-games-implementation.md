# Find Free Games Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hoan thien website tinh tong hop game free/sale, giao dien giong wireframe va data flow Epic + Steam.

**Architecture:** Du lieu duoc hop nhat tu Epic API va JSON Steam noi bo theo 1 schema chung. Frontend vanilla JS render card theo tab filter. Pipeline GitHub Actions cap nhat du lieu Steam dinh ky.

**Tech Stack:** HTML, CSS, JavaScript (ES modules), Python (requests + bs4), GitHub Actions

---

### Task 1: Scaffold frontend skeleton

**Files:**
- Create: `index.html`
- Create: `css/style.css`

- [ ] **Step 1: Tao khung HTML**
- [ ] **Step 2: Tao style bo cuc theo wireframe**
- [ ] **Step 3: Chay thu bang mo file local**

### Task 2: Implement data loaders and contracts

**Files:**
- Create: `js/epic.js`
- Create: `js/steam.js`
- Create: `data/steam_deals.json`

- [ ] **Step 1: Viet ham load Epic va normalize**
- [ ] **Step 2: Viet ham load Steam JSON va normalize**
- [ ] **Step 3: Them du lieu mau cho Steam**

### Task 3: Implement filter logic with tests

**Files:**
- Create: `js/filters.js`
- Create: `test/filters.test.js`
- Create: `package.json`

- [ ] **Step 1: Viet test fail cho cac tab filter**
- [ ] **Step 2: Implement filter toi thieu de pass**
- [ ] **Step 3: Chay `node --test` xac nhan pass**

### Task 4: Integrate rendering and interactions

**Files:**
- Create: `js/main.js`
- Modify: `index.html`

- [ ] **Step 1: Khoi tao app, merge du lieu, render card**
- [ ] **Step 2: Noi filter button events**
- [ ] **Step 3: Them modal huong dan claim Epic free**

### Task 5: Add Steam update automation

**Files:**
- Create: `scripts/scrape_steam.py`
- Create: `.github/workflows/update_steam.yml`

- [ ] **Step 1: Viet script scrape/seed Steam deals**
- [ ] **Step 2: Tao workflow chay theo schedule**
- [ ] **Step 3: Tai lieu hoa cach chay tay**

### Task 6: Verification and polish

**Files:**
- Modify: `idea.md`
- Create: `README.md`

- [ ] **Step 1: Chay test `node --test`**
- [ ] **Step 2: Ra soat linter/issues de khong vo giao dien**
- [ ] **Step 3: Viet huong dan su dung va trien khai GitHub Pages**
