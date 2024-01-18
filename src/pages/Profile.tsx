import axios from "axios"
import { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import arrowLeft from '../../assets/arrowLeft.png'
import { Account, find, getRandomPhoto } from '../utils/getAccounts'

interface Flags {
    png: string
    svg: string
    alt: string
}

const Profile: FC = () => {
    const { id } = useParams<{ id: string }>()

    const [flag, setFlag] = useState<Flags>()
    const [account, setAccount] = useState<Account>()
    const [randomPhoto, setRandomPhoto] = useState<string>()

    const src = `https://restcountries.com/v3.1/name/${account?.profile.country}`

    useEffect(() => {
        const data = find(id as string)
        setAccount(data)

        setRandomPhoto(getRandomPhoto())
    }, [id])

    //трохи не архітектурно
    useEffect(() => {
        axios.get(src).then((data) => {
            setFlag(data.data[0].flags)
        })
    }, [account])

    return (
        <div className='min-h-[89.3vh] p-4 flex flex-col items-center'>
            <Link to={'/'} className='w-[100%] cursor-default'>
                <img src={arrowLeft} alt="<- Back" title='back' className='w-[40px] cursor-pointer' />
            </Link>

            <div>
                <div className="flex gap-12">
                    <div className="flex  items-center gap-12">
                        <div className="flex items-center gap-2">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png"
                                alt="GMail"
                                className="w-[20px] h-[16px]" />
                            <span className="text-[22px]">{account?.email}</span>
                        </div>
                        <div className="text-[20px]">
                            <span>Profile ID: </span>
                            <span className="font-medium underline">{account?.profile.profileId}</span>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <p className="text-[20px]">{account?.profile.country}</p>
                        <img src={flag?.png} alt={flag?.alt} className='border rounded w-[60px]' />
                    </div>
                </div>
                <div className="mt-12">
                    <span className="text-[30px] font-bold">{account?.profile.marketplace}</span>
                    <img src={randomPhoto} alt="random photo" className="object-cover w-[400px]" />
                    <p className="w-[650px] mt-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui sequi explicabo
                        quia expedita facere libero minima animi, deleniti quidem nemo necessitatibus
                        itaque corporis aliquam tenetur mollitia id pariatur voluptates dolorem labore?
                        Iure earum molestias porro excepturi, veritatis modi cumque natus reprehenderit.
                        Consequuntur rem consequatur ducimus mollitia illum? Voluptatem doloribus quos,
                        inventore provident deleniti placeat ea dolor sed accusamus cumque repudiandae possimus,
                        asperiores ab odit qui exercitationem voluptas assumenda facere incidunt blanditiis debitis
                        perferendis nam est? Assumenda, provident nihil, neque illo pariatur dolore, quas quibusdam vel
                        consequatur doloribus sunt ut. Assumenda, facilis reprehenderit fugiat eaque necessitatibus ipsa
                        at error placeat iure!</p>
                </div>

                <Link to={`/campaigns/${account?.accountId}`} className="bg-[#4266b5] text-white py-4 w-[100%] flex justify-center mt-6 text-[18px] rounded-2xl hover hover:bg-[#395ba6]">
                    More about company...
                </Link>
            </div>
        </div>
    )
}

export default Profile
