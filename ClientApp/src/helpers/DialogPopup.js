import Swal from "sweetalert2";

export const showErrorMsg = (msg, time = 3500) => {
    Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: msg,
        showConfirmButton: false,
        timer: time
    }) 
};

export const showSuccessMsg = (msg, time = 3500) => {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: msg,
        showConfirmButton: false,
        timer: time
    })
};

export const showInfoMsg = (msg, time = 3500) => {
    Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: msg,
        showConfirmButton: false,
        timer: time
    })
};

export const showWarningMsg = (msg, time = 3500) => {
    Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: msg,
        showConfirmButton: false,
        timer: time
    })
};

export default {
    showErrorMsg,
    showSuccessMsg,
    showInfoMsg,
    showWarningMsg
}
