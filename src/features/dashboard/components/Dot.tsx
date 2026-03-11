function Dot({ color, pulse }: any) {
  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-flex',
        width: 8,
        height: 8,
        flexShrink: 0,
      }}
    >
      {pulse && (
        <span
          style={{
            position: 'absolute',
            inset: -2,
            borderRadius: '50%',
            background: color,
            opacity: 0.3,
            animation: 'ping 1.5s infinite',
          }}
        />
      )}
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: color,
          display: 'block',
        }}
      />
    </span>
  )
}
export default Dot
