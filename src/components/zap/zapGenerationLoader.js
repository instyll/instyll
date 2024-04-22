import React from "react";
import BounceLoader from "react-spinners/BounceLoader";

const ZapGenerationLoader = ({loading}) => {

    // const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    return (
        <div className="zapLoaderContainer">
            <h2 className="zapLoaderLabel">Instyll AI is generating zaps</h2>
            <div className="bounceContainer">
                <BounceLoader 
                    color="#5271ff"
                    loading={loading}
                    // style={style}
                    size={50}
                />
            </div>
        </div>
    );
}

export default ZapGenerationLoader;