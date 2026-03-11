import { Button } from 'antd'

// interface IProps {
//   id?: any
// }

const ContractActionButton = () => {
  return (
    <div className="flex items-center gap-6">
      <Button
        type="link"
        className="bg-primary px-0 px-3 py-[10] text-base font-medium text-white"
      >
        Расторгнут договор
      </Button>
    </div>
  )
}

export default ContractActionButton
