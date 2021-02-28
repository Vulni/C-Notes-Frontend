import React from 'react'

export const KeywordGroup = ({ values, setValues, deleteFromNotes, notes, inputValues, setInputValues, setShowTitle }) => {

    const { keywords, color } = values;

    const deleteKeyword = (e) => {
        if( deleteFromNotes ){
            let newKeywords = keywords.filter( kw => kw != e.target.title );
            let newCard = {...values, keywords: newKeywords};
            let newNotes = notes.map( nt => {
                if( nt.note == values.note ) return newCard;
                else return nt;
            })
            setValues(newNotes);
        } else {
            const { title } = e.target;
            let newKeywords = keywords.filter( kw => kw != title );
            setValues({...values, keywords: newKeywords });
        }       
    }  
    
    const editNote = () => {
        window.scrollTo(0,0);
        console.log(values);
        setInputValues(values);
        setShowTitle(false);
    }

    return (
        <> 
            {
                ( keywords.length == 0 && deleteFromNotes ) &&
                (
                    <div className="d-inline-flex w-100 align-items-center mt-3" style={{overflowX:"auto"}}>
                        {
                            ( deleteFromNotes ) &&
                            (
                                <button className={`btn btn-sm mr-2 shadow-none text-white animate__animated animate__fadeIn animate__faster mb-1 text-white ${color}`} onClick={editNote}>
                                    <span>Edit</span>
                                </button>
                            )
                        }
                    </div>
                )
            }
            
            {
                ( keywords.length > 0 && deleteFromNotes ) &&
                (
                    <div className="d-inline-flex w-100 align-items-center mt-3" style={{overflowX:"auto"}}>
                        
                        <button className={`btn btn-sm mr-2 shadow-none text-white animate__animated animate__fadeIn animate__faster mb-1 ${color}`} onClick={editNote}>
                            <span>Edit</span>
                        </button>
        
                        {
                        keywords.map( (kw, index) => (
                            <button className="btn btn-sm btn-secondary mr-2 shadow-none animate__animated animate__fadeIn animate__faster mb-1 text-white" title={kw} key={index} onClick={deleteKeyword}>
                                <span title={kw}>{kw}</span>
                            </button>
                        ))
                        }
                    </div>
                )
            }

            {
                ( keywords.length > 0 && !deleteFromNotes ) &&
                (
                    <div className="d-inline-flex w-100 align-items-center mt-3" style={{overflowX:"auto"}}>
                        {
                            keywords.map( (kw, index) => (
                                <button className="btn btn-sm btn-secondary mr-2 shadow-none animate__animated animate__fadeIn animate__faster d-inline-flex align-items-center mb-1 text-white" title={kw} key={index} onClick={deleteKeyword}>
                                    <span title={kw}>{kw}</span>
                                    <i className="fas fa-times ml-2" style={{marginTop:"2px"}} title={kw}/>
                                </button>
                            ))
                            }
                    </div>
                )
            }
        </>
    )
}
