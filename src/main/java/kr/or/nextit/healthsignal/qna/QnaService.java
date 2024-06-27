package kr.or.nextit.healthsignal.qna;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QnaService {
    public final QnaMapper qnaMapper;

    public List<QuestionVO> selectQuestionList(){
        return qnaMapper.selectQuestionList();
    }

    public QuestionVO selectQuestion(int queNo){
        return qnaMapper.selectQuestion(queNo);
    }

    public int insertQuestion(QuestionVO questionVO){
        return qnaMapper.insertQuestion(questionVO);
    }

    public int deleteQuestion(int queNo){
        return qnaMapper.deleteQuestion(queNo);
    }

    public AnswerVO selectAnswer(int queNo){
        return qnaMapper.selectAnswer(queNo);
    }

}
