package kr.or.nextit.healthsignal.qna;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface QnaMapper {
    List<QuestionVO> selectQuestionList(QuestionVO questionVO);
    QuestionVO selectQuestion(int queNo);
    int insertQuestion(QuestionVO questionVO);
    int deleteQuestion(int queNo);
    AnswerVO selectAnswer(int queNo);
    int insertAnswer(AnswerVO answerVO);
    int updateQueAnswer(AnswerVO answerVO);
    QuestionVO getUserNoByQueNo(int queNo);
}
