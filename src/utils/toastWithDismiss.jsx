import toast from 'react-hot-toast';

export const toastWithDismiss = (message, options = {}) => {
  const { duration = 4000, type = 'success' } = options;
  const toastFn = typeof toast[type] === 'function' ? toast[type] : toast;

  return toastFn(
    (t) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
        <span>{message}</span>
        <button
          onClick={() => toast.dismiss(t.id)}
          style={{
            marginLeft: 'auto',
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            padding: '0 2px',
            color: '#666'
          }}
        >
          ×
        </button>
      </div>
    ),
    { duration }
  );
};
