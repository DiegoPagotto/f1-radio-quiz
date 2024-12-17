import { ReloadOutlined } from '@ant-design/icons';
import './quizActions.css';

interface QuizActionsProps {
    handleSkip: () => void;
}

const QuizActions = ({ handleSkip }: QuizActionsProps) => {
    return (
        <div className="quiz-actions">
            <button className="skip-quiz" onClick={handleSkip}>
                <ReloadOutlined />
            </button>
        </div>
    );
};

export default QuizActions;
