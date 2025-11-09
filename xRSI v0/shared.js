// Updated shared.js
const RSXXXDB = {
  get() {
    return JSON.parse(localStorage.getItem('rsxxx-demo')) || {
      vessels: [
        { imo: "1234567", name: "MV Ocean Star", license: "2023-12-31", id: 1 }
      ],
      crew: [],
      config: {
        requiredFields: ['firstName', 'lastName'],
        certificates: ['passport']
      }
    };
  },

  save(data) {
    localStorage.setItem('rsxxx-demo', JSON.stringify(data));
    // Trigger event across browser tabs
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'rsxxx-demo',
      newValue: JSON.stringify(data)
    }));
  }
};

// Cross-tab communication
window.addEventListener('storage', (e) => {
  if (e.key === 'rsxxx-demo') {
    window.dispatchEvent(new Event('rsxxxUpdate'));
  }
});