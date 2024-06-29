package kr.or.nextit.healthsignal.qna;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QnaService {
    public final QnaMapper qnaMapper;

    public List<QuestionVO> selectQuestionList(QuestionVO questionVO){
        return qnaMapper.selectQuestionList(questionVO);
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

    @Transactional
    public int insertAnswer(AnswerVO answerVO){
        qnaMapper.updateQueAnswer(answerVO);
        return qnaMapper.insertAnswer(answerVO);
    }

    public QuestionVO getUserNoByQueNo (int queNo){
        QuestionVO questionVO = qnaMapper.getUserNoByQueNo(queNo);
        return questionVO;
    }

}
