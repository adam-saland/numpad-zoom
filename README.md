# Numpad zoom

## How to use

In order to keep the functionality of the numpad +/- keys we have to use the ctrlKey in our condition that checks the keypress event. This ignores zooming when the numpad +/- keys are pressed without the ctrl key.

### Code

- `public/js/main.js`
  - lines: 19-31

### Install and run

```bash
cd numpad-zoom
npm install
npm start
```
