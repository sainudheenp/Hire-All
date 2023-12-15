import React from 'react'
import InputField from '../components/InputField'

const Location = ({handleChange}) => {
  return (
    <div>
        <h4 className="text-lg font-medium mb-2">Location</h4>

        <div>
            <label className="sidebar-label-container">
                <input type="radio" name='test' id='test' value='' onChange={handleChange} />
                <span className="checkmark"></span> All
            </label>
        </div>

        <InputField handleChange={handleChange} value="london" title="London" name="test"/>
    </div>
  )
}

export default Location