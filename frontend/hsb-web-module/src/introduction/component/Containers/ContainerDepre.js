import './ContainerDepre.css';
function ContainerDepre(){
    return (
        <div id="containerDepreciation">

            <div className="containerDepre" id="containerDepre1">
                <h2 className='h2Depre'>Total Anual Depreciation</h2>
                <div className="value">$0.00</div>
            </div> 
           
            <div className="containerDepre" id="containerDepre2">
                <h2 className='h2Depre'>Total Montly Depreciation</h2>
                <div className="value">$0.00</div>
            </div>
            

        </div>
    );
}
export default ContainerDepre;