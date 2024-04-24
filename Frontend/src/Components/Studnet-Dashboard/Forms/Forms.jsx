const Forms = () => {
    return(
        <div className="form-container">
            <form>
                <div className="form-group">
                    <label>General Health Questions:</label>
                    <h5>Do you have any existing medical conditions?</h5>
                    <input type="text"/>
                    <h5>Are you currently taking any medications?</h5>         
                    <input type="text" />
                    <h5>Have you had any recent surgeries or injuries?</h5>
                    <input type="text" />
                    <h5>Do you have any allergies?</h5>
                    <input type="text" />
                </div>
                <div className="form-group">
                    <label>Physical Health Questions:</label>
                    <h5>Do you experience any chronic pain or discomfort?</h5>
                    <input type="text" placeholder="" />
                    <h5>Are there any areas of your body that are particularly sensitive or injured?</h5>
                    <input type="text" placeholder="" />
                    <h5>Do you have any physical limitations or mobility issues?</h5>
                    <input type="text" placeholder="" />
                </div>
                <div className="form-group">
                    <label>Yoga Experience and Preferences:</label>
                    <h5>Have you practiced yoga before?</h5>
                    <input type="text" placeholder="" />
                    <h5>What styles of yoga have you practiced, if any?</h5>
                    <input type="text" placeholder="" />
                    <h5>Are there any specific goals or areas of focus you have for your yoga practice?</h5>
                    <input type="text" placeholder="" />
                    <h5>Are there any poses or movements you prefer to avoid?</h5>
                    <input type="text" placeholder="" />
                </div>
            </form>
        </div>
    );
};

export default Forms;
