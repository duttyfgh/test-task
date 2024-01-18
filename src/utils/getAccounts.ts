import { countries, marketplaces, marketplacsPhotos } from "./data"

export interface Account {
    accountId: number
    email: string
    authToken: number
    creationDate: Date
    profile: Profile
}

export interface Profile {
    profileId: number
    country: string
    marketplace: string
    campaigns: Campaign
}

export interface Campaign {
    campaignId: number
    clicks: number
    cost: number
    date: Date
}

const getRandomElement = (array: string[]): string => array[Math.floor(Math.random() * array.length)]

const generateRandomCampaign = (): Campaign => ({
    campaignId: +(new Date(Math.floor(Math.random() * (new Date().getTime())))),
    clicks: Math.floor(Math.random() * 100),
    cost: Math.floor(Math.random() * 10000),
    date: new Date(Math.floor(Math.random() * new Date().getTime())),
})

const generateRandomProfile = (): Profile => ({
    profileId: Math.floor(Math.random() * 10000) + 1,
    country: getRandomElement(countries),
    marketplace: getRandomElement(marketplaces),
    campaigns: generateRandomCampaign(),
})

const accounts: Account[] = Array.from({ length: 100 }, (_, index) => ({
    accountId: index + 1,
    email: `user${index + 1}@gmail.com`,
    authToken: +(new Date(Math.floor(Math.random() * (new Date().getTime())))),
    creationDate: new Date(Math.floor(Math.random() * (new Date().getTime()))),
    profile: generateRandomProfile(),
}))

const getPage = (page: number, arr: Account[] = accounts) => {
    const pageSize = 5
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    return arr.slice(startIndex, endIndex)
}

export const find = (id: string) => {
    return accounts.find(account => account.accountId === +id)
}

export const getRandomPhoto = () => {
    return getRandomElement(marketplacsPhotos)
}

export const sortByNewestFirst = (): Account[] => {
    return [...accounts].sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime())
}

export const sortByOldestFirst = (): Account[] => {
    return [...accounts].sort((a, b) => a.creationDate.getTime() - b.creationDate.getTime())
}

export const getAccountsByYear = (year: number): Account[] => {
    return accounts.filter(account => account.creationDate.getFullYear() === year)
}


export default getPage