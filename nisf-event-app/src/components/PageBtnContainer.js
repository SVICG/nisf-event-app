import React from 'react'
import Wrapper from '../assets/wrappers/PageBtnContainer'
import { useAppContext } from '../context/appContext'
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

const PageBtnContainer = () => {

    const { numOfPages, page, changePage } = useAppContext()

    const pages = Array.from({ length: numOfPages }, (_, index) => {
        return index + 1
    })


    const nextPage = () => {
        let newPage = page + 1
        if (newPage > numOfPages) {
            newPage = 1
        }
        changePage(newPage)
    }

    const prevPage = () => {
        let newPage = page - 1
        if (newPage < 1) {
            newPage = numOfPages
        }
        changePage(newPage)
    }


    return (
        <Wrapper>
            <button className='prev-btn' onClick={prevPage}>
                <AiFillCaretLeft />
                prev
            </button>
            <div className="btn-conatiner">
                {pages.map((pageNumber) => {
                    return (

                        <button type='button' className={pageNumber === page ? 'pageBtn active' : 'pageBtn'} key={pageNumber} onClick={() => changePage(pageNumber)}>
                            {pageNumber}
                        </button>
                    )
                })} </div>
            <button className='next-btn' onClick={nextPage}>
                 next
                <AiFillCaretRight />
            </button>
        </Wrapper>
    )
}

export default PageBtnContainer