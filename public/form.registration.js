/**
 * Created by IlyaLitvinov on 12.12.15.
 */
(function () {
    var form = document.querySelector('.registration_form__wrapper'),
        inputWrapper = form.querySelector('.input_wrapper'),
        inputName = form.querySelector('.input_element__name'),
        btnSubmit = form.querySelector('.btn_submit');

    btnSubmit.addEventListener('click', function () {
        if (!inputName.value || isValidName(inputName.value)) {
            inputWrapper.classList.add('notValid');
        } else {
            inputWrapper.classList.remove('notValid');
        }
    });
    function isValidForm() {

    }

    function isValidName(str) {
        return !/^[0-9]*$/.test(str);
    }
}());