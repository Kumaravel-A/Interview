import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function showmessage(msg, msgType = 'success', autoClose = 5000) {

    if (msgType === 'success') {
        toast.success(msg, {
            position: "bottom-center",
            autoClose: autoClose,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
        });
    } else {
        toast.error(msg, {
            position: "bottom-center",
            autoClose: autoClose,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
        });
    }
}

