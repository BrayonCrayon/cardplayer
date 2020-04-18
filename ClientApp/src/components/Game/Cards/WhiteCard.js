import React, {useMemo} from "react";
import {connect} from "react-redux";


const WhiteCard = ({ card, disabled, onSelect }) => {
    
    const classes = useMemo(() => {
        return disabled ? "cursor-not-allowed shadow-inner" : "shadow-md hover:border-black cursor-pointer hover:shadow-lg";
    }, [disabled]);
    
    return (
        <div className={`border border-white rounded bg-white m-1 h-48 p-2 w-1/5 ${classes}`}
            onClick={() => { onSelect(card) }}
        >
            <div className="font-bold">
                <div dangerouslySetInnerHTML={{__html: card.card.text }} />
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    
});

export default connect(mapStateToProps)(WhiteCard);