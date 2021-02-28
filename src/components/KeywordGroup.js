import React from 'react'

export const KeywordGroup = ({ inputValues, setInputValues, setAction, showDeleteOption }) => {

    const { keywords, color } = inputValues;

    const deleteKeyword = (kw) => {
        let newKeywords = keywords.filter( kwd => kwd != kw );
        setInputValues({ ...inputValues, keywords: newKeywords });
    }  
    
    const editNote = () => {
        window.scrollTo(0,0);
        setInputValues(inputValues);
        setAction("edit");
    }

    return (
        <>
            {
                ( showDeleteOption && keywords.length > 0) && 
                (
                    <div className="d-inline-flex align-items-center w-100 mt-3 mb-0" style={{overflowX:"auto"}}>
                        {
                            keywords.map( (kw, index) => (
                                <button className="btn btn-sm btn-secondary d-inline-flex align-items-center mr-2 shadow-none" key={index} onClick={() => deleteKeyword(kw)}>
                                    <div className="mr-2">{kw}</div>
                                    <i className="fas fa-times"/>
                                </button>
                            ))
                        }
                    </div>
                )                
            }    
            {
                ( !showDeleteOption && keywords.length > 0) && 
                (
                    <div className="d-inline-flex w-100 align-items-center w-100 mt-3 mb-1" style={{overflowX:"auto"}}>
                        <button className={`btn btn-sm mr-2 shadow-none text-white ${color}`} onClick={editNote}>
                            <span>Edit</span>
                        </button>
                        {
                            keywords.map( (kw, index) => (
                                <button className="btn btn-secondary btn btn-sm text-white d-inline-flex align-items-center mr-2 shadow-none" key={index}>
                                    <span>{kw}</span>
                                </button>
                            ))
                        }
                    </div>
                )                
            }       
        </>
    )
}

