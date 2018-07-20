import React from 'react';

export default (field) => {
    return (
        <div className={"form-group" + (field.meta.touched && field.meta.error ? ' has-danger' : '')}>
            <label htmlFor={field.id}>{field.label}</label>
            <input className="form-control" type={field.type} id={field.id} {...field.input}></input>
            <p className="error-msg">{field.meta.touched ? field.meta.error : ''}</p>
        </div>
    );
}