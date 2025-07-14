import { Button } from 'antd'

// interface IProps {
//   id?: any
// }

const ContractActionButton = () => {
  return (
    <div className="flex items-center gap-6">
      <Button
        type="link"
        className="text-[16px] text-white font-medium px-0 bg-primary py-[10] px-3"
      >
        Расторгнут договор
      </Button>
    </div>
  )
}

export default ContractActionButton
