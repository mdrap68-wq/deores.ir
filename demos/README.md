# Live portfolio demos

Four sample websites are embedded as static builds under `/public/demos/` and linked from نمونه‌کارها.

| Folder | Live path | Source label |
|--------|-----------|--------------|
| `iran-analytics` | `/demos/iran-analytics/` | ایران آنالیتیکس |
| `fast-food-website` | `/demos/fast-food-website/` | بایت / BITE فست‌فود |
| `kalachi` | `/demos/kalachi/` | کالاچی |
| `abbaspour` | `/demos/abbaspour/` | گروه صنعتی عباسپور / آدرین |

Rebuild all demos after editing a demo source:

```bash
npm run build:demos
```

Each demo keeps its own `package.json`. Dependencies live in `demos/*/node_modules` (gitignored).
