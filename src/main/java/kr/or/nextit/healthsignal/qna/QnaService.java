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
}
