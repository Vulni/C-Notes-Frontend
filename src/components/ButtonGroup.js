import React from 'react'

const colors = [
    "bg-mint",
    "bg-powder",
    "bg-fresh",
    "bg-lavander",
    "bg-starry-night",
    "btn-primary",
    "bg-silk",
    "bg-tan",
    "bg-apricot",
    "bg-sunflowers",
    "bg-tangerine",
    "bg-chilly",
    "bg-watermelon"
]

export const ButtonGroup = ({ inputValues, setInputValues }) => {

    const changeColor = (e) => {
        setInputValues({...inputValues, color: e.target.title });
    }

    return (
        <>
        {
            <div className="d-inline-flex w-100 align-items-center" style={{overflowX:"auto"}}>
                {
                    colors.map( (clr,index) => (
                        <button className={`btn mr-2 text-white shadow-none mb-1 ${clr}`} key={index} title={clr} onClick={changeColor}>
                            <i className="fas fa-adjust" title={clr}/>
                        </button>
                    ))
                }
            </div>
        }
        </>
    )
}
