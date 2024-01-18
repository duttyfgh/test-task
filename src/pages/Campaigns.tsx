import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Account, find } from "../utils/getAccounts"
import arrowLeft from '../../assets/arrowLeft.png'
import trendUp from '../../assets/trendUp.png'
import trendDown from '../../assets/trendDown.png'
import { formatDate } from "../utils/dataFormater"
import { formatTime } from "../utils/timeFormater"

const Campaigns = () => {
    const { id } = useParams<{ id: string }>()
    const [account, setAccount] = useState<Account>()

    const isTrendUp = Math.random() < 0.5
    const howMuchIsTrend = Math.floor(Math.random() * 100) + 1

    const isCostUp = Math.random() < 0.5
    const howMuchIsCost = Math.floor(Math.random() * 100) + 1

    const date = formatDate(account?.profile?.campaigns?.date as Date)
    const time = formatTime(account?.profile?.campaigns?.date as Date)

    useEffect(() => {
        const data = find(id as string)
        setAccount(data)
    }, [id])

    return (
        <div className="min-h-[89.3vh] p-4">
            <Link to={`/profile/${id}`} className='w-[100%] cursor-default'>
                <img src={arrowLeft} alt="<- Back" title='back' className='w-[40px] cursor-pointer' />
            </Link>
            <div className="flex flex-col items-center">
                <div>
                    <span className="text-[30px] font-bold">Analytic</span>
                    <div className="mt-4">
                        <img
                            src='https://s3.envato.com/files/32e3a2ec-49be-4bea-850d-2162065ae4bf/inline_image_preview.jpg'
                            alt="random photo"
                            className="object-cover w-[400px] mb-5" />
                        <div className="flex text-[18px] gap-2">
                            <div>
                                <span className="text-[20px]">Clicks per week: </span>
                                <span className="font-medium">{account?.profile.campaigns.clicks};</span>
                            </div>
                            {
                                isTrendUp
                                    ? <div className="flex">
                                        <img src={trendUp} alt="^" className="w-[30px]" />
                                        <span className="text-[#339338] mt-[-12px]">{howMuchIsTrend}%</span>
                                    </div>
                                    : <div className="flex">
                                        <img src={trendDown} alt="^" className="w-[30px]" />
                                        <span className="text-[#c83b3b] mt-[-12px]">{howMuchIsTrend}%</span>
                                    </div>
                            }

                        </div>

                        <div className="flex text-[20px] gap-2 mt-4">
                            <span>Cost: </span>
                            <span className="font-medium">{account?.profile.campaigns.cost}$;</span>
                            {
                                isCostUp
                                    ? <div className="flex">
                                        <img src={trendUp} alt="^" className="w-[30px]" />
                                        <span className="text-[#339338] mt-[-12px]">{howMuchIsCost}%</span>
                                    </div>
                                    : <div className="flex">
                                        <img src={trendDown} alt="^" className="w-[30px]" />
                                        <span className="text-[#c83b3b] mt-[-12px]">{howMuchIsCost}%</span>
                                    </div>
                            }

                        </div>

                        <div className="flex text-[18px] gap-2 mt-4">
                            <span className="text-[20px]">Date: </span>

                            <div className="flex gap-4 items-start">
                                <div className="flex items-center gap-1 mb-1">
                                    <img
                                        src="../../assets/clock.png"
                                        alt="time"
                                        className="w-[20px] h-[19px]" />
                                    <span>{time},</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <img
                                        src="../../assets/calendar.png"
                                        alt="time"
                                        className="w-[20px] h-[19px]" />
                                    <span>{date}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Campaigns