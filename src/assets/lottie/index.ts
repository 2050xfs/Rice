// Placeholder animation for animations that haven't been created yet
export const placeholderAnimation = async () => {
  console.warn('Placeholder animation used - replace with actual animation');
  return {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 60,
    w: 512,
    h: 512,
    nm: "Placeholder Animation",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Shape Layer",
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { 
            a: 1, 
            k: [
              { t: 0, s: [0], e: [360], i: { x: [0.5], y: [0.5] }, o: { x: [0.5], y: [0.5] } },
              { t: 60, s: [360] }
            ], 
            ix: 10 
          },
          p: { a: 0, k: [256, 256, 0], ix: 2, l: 2 },
          a: { a: 0, k: [0, 0, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 }
        },
        ao: 0,
        shapes: [
          {
            ty: "rc",
            d: 1,
            s: { a: 0, k: [100, 100], ix: 2 },
            p: { a: 0, k: [0, 0], ix: 3 },
            r: { a: 0, k: 0, ix: 4 },
            nm: "Rectangle Path",
            mn: "ADBE Vector Shape - Rect",
            hd: false
          },
          {
            ty: "fl",
            c: { a: 0, k: [0.4, 0.4, 0.8, 1], ix: 3 },
            o: { a: 0, k: 100, ix: 4 },
            r: 1,
            bm: 0,
            nm: "Fill",
            mn: "ADBE Vector Graphic - Fill",
            hd: false
          }
        ],
        ip: 0,
        op: 60,
        st: 0,
        bm: 0
      }
    ],
    markers: []
  };
};

// Dynamic imports for code splitting - using optimized versions
export const confetti = () => import('./confetti.min.json').then(m => m.default);
export const scrollIndicator = () => import('./scroll-indicator.min.json').then(m => m.default);
export const loadingSpinner = () => import('./loading-spinner.min.json').then(m => m.default);

// Placeholder functions for animations that haven't been created yet
// These will be replaced with actual implementations as animations are created
export const socialBooth1 = placeholderAnimation;
export const socialBooth2 = placeholderAnimation;
export const socialBooth3 = placeholderAnimation;
export const socialBooth6 = placeholderAnimation;
export const socialBooth7 = placeholderAnimation;
