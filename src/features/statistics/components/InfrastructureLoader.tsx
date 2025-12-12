import Lottie from 'lottie-react'
import animationData from '@/assets/lottie/infra-loader.json'

const InfrastructureLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <Lottie
        animationData={animationData}
        loop
        style={{ width: 60, height: 60 }}
      />

      <span className="text-sm text-[#5E6D82]">Загрузка...</span>
    </div>
  )
}

export default InfrastructureLoader