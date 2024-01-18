import { ChangeEvent, useEffect, useState } from "react"
import AccountCard from "../components/AccountCard"
import getPage, { Account, getAccountsByYear, sortByNewestFirst, sortByOldestFirst } from "../utils/getAccounts"
import arrowLeft from '../../assets/arrowLeft.png'
import arrowRight from '../../assets/arrowRight.png'
import sort from '../../assets/sort.png'
import calendar from '../../assets/calendar.png'

const Accounts = () => {
  const [accounts, setAccounts] = useState<Account[]>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isDropdown, setIsDropdown] = useState<boolean>(false)

  useEffect(() => {
    const data = getPage(currentPage)
    setAccounts(data)
  }, [currentPage])

  const changePage = (page: number) => {
    setCurrentPage(page)
  }

  const prev = () => {
    if (currentPage >= 2) {
      setCurrentPage(currentPage - 1)
    } else return
  }

  const next = () => {
    if (currentPage <= 19) {
      setCurrentPage(currentPage + 1)
    }
  }

  const isDropdownHandler = () => {
    setIsDropdown(!isDropdown)
  }

  const sortFormOldToNew = () => {
    const newData = getPage(currentPage, sortByOldestFirst())
    setAccounts(newData)
    isDropdownHandler()
  }

  const sortFormNewToOld = () => {
    const newData = getPage(currentPage, sortByNewestFirst())
    setAccounts(newData)
    isDropdownHandler()
  }

  const sortDefault = () => {
    const newData = getPage(currentPage)
    setAccounts(newData)
    isDropdownHandler()
  }

  const findByYear = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (value.length >= 3) {
      const data = getAccountsByYear(+value)
      setAccounts(data)
    }
  }

  return (
    <div className="py-12 flex flex-col items-center justify-around w-[100%] min-h-[89.3vh]">

      <div>
        <div className="relative flex justify-between w-[523px]">
          <div
            className="border rounded-xl p-3 hover cursor-pointer w-[60px] mb-2 ml-[23px] flex justify-center items-center"
            title='Click to choice sort'
            onClick={isDropdownHandler}>
            <img src={sort} alt="sort" className="w-[34px]" />
          </div>
          {
            isDropdown && <div className="absolute z-50 w-[200px] border rounded-xl py-4 px-4 bg-white shadow-md bottom-[-131px] left-[24px] flex flex-col gap-2">
              <span className="border-b hover cursor-pointer" onClick={sortFormNewToOld}>From new to old</span>
              <span className="border-b hover cursor-pointer" onClick={sortFormOldToNew}>From old to new</span>
              <span className="border-b hover cursor-pointer" onClick={sortDefault}>Default sort</span>
            </div>
          }

          <div className="border rounded-xl p-3 hover mb-2 ml-[23px] flex justify-center items-center">
            <input type="number" className="outline-none text-[24px] w-[70px]" max={2024} min={1970} onChange={findByYear} />
            <img src={calendar} alt="..." className="w-[30px]" />
          </div>

        </div>
        {(accounts?.length as number > 0)
          ? accounts?.map(account => (
            <AccountCard key={account.accountId} account={account} />
          ))
          : <div className='w-[100%] flex justify-center'>No items..</div>
        }

        { }
      </div>

      <div className="flex items-center gap-2 text-[20px]">
        <button onClick={prev} className='mr-3 hover'>
          <img
            className="w-[24px]"
            src={arrowLeft}
            alt="<-" />
        </button>
        <button className="hover" onClick={() => changePage(1)}>1 ...</button>
        <span className="font-medium">{currentPage}</span>
        <button className="hover" onClick={() => changePage(20)}>... 20</button>


        <button onClick={next} className='ml-3 hover'>
          <img
            className="w-[24px]"
            src={arrowRight}
            alt="->" /></button>
      </div>
    </div>
  )
}

export default Accounts