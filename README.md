# Finance Planner

## 🎬 Project Overview
An app to help with everything you need to know while making a huge fiancial decision like buying a new iPhone or a car or even planning your retirement.

Simple & clean ui and evethitng is rendered client side!!!
## 📸 Screenshots
![Finance Planner App](./docs/images/fianance-planner-screenshot.png)

![Custom React Components](./docs/images/custom-react-components.png)

## 🥞 Tech Stack
- **Next.js** - The React Framework
- **Chakra UI** - React component library
- **Chart.js** - JavaScript charting library

![Tech Stack logo](./docs/images/tech-stack-logo.png)

## 🏁 Getting Started

First clone the repo
```git
git clone https://github.com/joelm-code/next-finance-app
```
Next, install all the dependencies
```node
npm install
```

Finally, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the magic.

## 📁 Folder Structure

```tree
.
├── README.md
├── components                  # All the custom components for the app
│   ├── Chart                   
│   │   └── LineChart.js        - Line Chart that uses Chartjs to map the data
│   ├── Footer
│   │   └── index.jsx           - Footer
│   ├── Layout
│   │   └── index.jsx           - Layout wraps all pages with header and footer
│   ├── MenuCustom
│   │   └── index.js            - Menu used for naviagation in the topbar
│   ├── Navbar
│   │   └── index.jsx           - Top bar of the app
│   ├── TypewriterEffect
│   │   └── index.jsx           - Typewritter effect for the hero
│   └── logic
│       └── index.js            - All the logic for calcualtions
│
│
├── pages                        # All the pages for the app  
│   ├── _app.js
│   ├── api
│   │   └── hello.js
│   ├── home
│   │   └── index.js            - Homepage
│   ├── index.js
│   ├── long-term-plan          -  Long Term Planning pages        
│   │   └── [planId]            -  Dynanamic Routing to Retirement, Education, etc
│   │       └── index.js        
│   └── purchase-plan           
│       └── [productId]         -  Short Term Planning pages        
│           └── index.js        - Dynamic Routing to Mobile, Car, etc
├── public
│   ├── favicon.ico
│   └── vercel.svg
├── styles
│   ├── Home.module.css
│   └── globals.css
└── variables
    ├── charts.js
    └── general.js
```

## 👩‍⚖️ License

Copyright © 2014-present Joel Mascarenhas. This source code is licensed under the MIT license found in the
[LICENSE](https://github.com/joelm-code/rocket-maths/) file.

---

<img src="./docs/images/joel-coding-dark-mode-circle.png"/>
<sup>Made with ♥ and ☕️ by Joel Mascarenhas.</sup>
