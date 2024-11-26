import Swal from 'sweetalert2';
import { AlertType } from '../types/alert';

const TIMER_INTERVAL = 3000;

export const showAlertWithTimer = (type: AlertType) => {
    return new Promise<void>((resolve) => {
        Swal.fire({
            title: type === AlertType.Success ? 'Correct!' : 'Wrong...',
            icon: type,
            timer: TIMER_INTERVAL,
            timerProgressBar: true,
            showConfirmButton: false,
            toast: true,
            position: 'top-end',
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                resolve();
            }
        });
    });
};
