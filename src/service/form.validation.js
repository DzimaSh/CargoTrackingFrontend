export const handleInputLengthChange = (e, propertyName, minlength, maxlength, setError) => {
    if (e.target.value.length > maxlength) {
        setError([true, `${propertyName} is too long`])
    }
    else {
        if (e.target.value.length < minlength) {
            setError([true, `${propertyName} too short`])
        } else {
            setError([false, ''])
        }
    }
}

export const validateEmail = (email, setError) => {
    let isValid = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (!isValid) {
        setError([true, `Email is invalid`])
    }
}