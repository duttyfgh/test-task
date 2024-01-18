import { useState } from "react"
import arrow from '../../assets/arrow.png'
import xmark from '../../assets/xmark.png'
import { formatDate } from "../utils/dataFormater"
import { Account } from "../utils/getAccounts"
import { formatTime } from "../utils/timeFormater"

interface AccountCardProps {
    account: Account
}

const AccountCard = ({ account }: AccountCardProps) => {
    const [secretData, setSecretData] = useState<string | number>('1048325225682')
    const [isFold, setIsFold] = useState<boolean>(true)

    const date = formatDate(account.creationDate)
    const time = formatTime(account.creationDate)

    const secretDataShowHandler = () => {
        setSecretData(account.authToken)
        setTimeout(() => {
            setSecretData('1048325225682')
        }, 3000)
    }

    const unfoldHandler = () => {
        setIsFold(true)
    }

    const foldHandler = () => {
        setIsFold(false)

    }

    return (
        <div className="flex items-center">
            <span>{account.accountId}</span>

            <div
                className={`px-8 py-4 border flex flex-col ml-4 rounded mb-8 w-[500px] transition-all ease-in-out duration-300 overflow-hidden ${isFold ? 'h-14' : 'h-52'}`}>
                <div className="flex items-center justify-between w-[100%]">
                    <div className="flex items-center gap-2">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png"
                            alt="GMail"
                            className="w-[20px] h-[16px]" />
                        <span className="text-[18px]">{account.email}</span>
                    </div>
                    {
                        isFold
                            ? <img
                                src={arrow}
                                alt="\/"
                                title='Click to unfold'
                                className="w-[22px] h-[12px] ml-4 cursor-pointer hover"
                                onClick={foldHandler} />
                            : <img
                                src={xmark}
                                alt="Х"
                                title='Click to unfold'
                                className="w-[20px] h-[20px] ml-4 cursor-pointer hover"
                                onClick={unfoldHandler} />
                    }

                </div>

                <div className="flex justify-between items-center mt-6">
                    <div>
                        <span className="text-[#4d9c39] font-medium">Auth token: </span>
                        <span className={`cursor-pointer ${(secretData === '1048325225682') && 'blur-[3px]'}`} onClick={secretDataShowHandler}> {secretData}</span>
                    </div>
                    <div>
                        <div className="flex items-center gap-1 mb-1">
                            <img
                                src="../../assets/clock.png"
                                alt="time"
                                className="w-[20px] h-[19px]" />
                            <span>{time}</span>
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

                <a
                    className="w-[100%] rounded-2xl bg-[#4266b5] flex items-center justify-center py-2 mt-6 text-white cursor-pointer hover"
                    href={`/profile/${account.accountId}`}>
                    More
                </a>
            </div>
        </div>
    )
}

export default AccountCard