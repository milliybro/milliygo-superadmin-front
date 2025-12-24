import { InputNumber, type InputNumberProps } from 'antd'

type Props = InputNumberProps

export function BillingInputNumber({ ...props }: Props) {
  return (
    <InputNumber
      className="select-shadow w-full"
      controls={false}
      formatter={(value) => {
        if (!value) return ''
        const [int, dec] = value.toString().split('.')
        const formattedInt = Number(int).toLocaleString('en-US')
        return dec !== undefined ? `${formattedInt}.${dec}` : formattedInt
      }}
      parser={(value) => {
        if (!value) return ''
        return value.replace(/,/g, '')
      }}
      onKeyDown={(e) => {
        const allowedKeys = [
          'Backspace',
          'Delete',
          'ArrowLeft',
          'ArrowRight',
          'Tab',
          '.',
        ]

        if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
          e.preventDefault()
        }

        if (e.key === '.' && e.currentTarget.value.includes('.')) {
          e.preventDefault()
        }
      }}
      onPaste={(e) => {
        const pasted = e.clipboardData.getData('text')
        if (!/^\d*\.?\d*$/.test(pasted.replace(/,/g, ''))) {
          e.preventDefault()
        }
      }}
      {...props}
    />
  )
}
