import React from 'react'

const STSectionBox = ({icon = 'atom',title = 'boosh',color = '#109fda'}) =>
    <section className="stSectionBoxWrap">
        <div className="stSectionBox">
            <div className="stSectionBoxInner z-depth-3" style={{border:'1px solid '+color}}>
                <div className="stSectionBoxContainer">
                    <div>
                        <div><i className={"brainy-"+icon}></i></div>
                        <div className="boxTitle">{title}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

export default STSectionBox