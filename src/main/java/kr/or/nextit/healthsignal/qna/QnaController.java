package kr.or.nextit.healthsignal.qna;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class QnaController {
    private final QnaService qnaService;

    @GetMapping("/question/list")
    public ResponseEntity<List<QuestionVO>> selectQuestionList() {
        List<QuestionVO> questionList = qnaService.selectQuestionList();
        return ResponseEntity.ok(questionList);
    }

    @GetMapping("/question/view")
    public ResponseEntity<QuestionVO> selectQuestion(@RequestParam("queNo") int queNo) {
        QuestionVO questionVO = qnaService.selectQuestion(queNo);
        return ResponseEntity.ok(questionVO);
    }

    @PostMapping("/question/add")
    public int insertQuestion(@RequestBody QuestionVO questionVO){
        int result = qnaService.insertQuestion(questionVO);
        return result;
    }

    @GetMapping("/question/delete")
    public int deleteQuestion(@RequestParam("queNo") int queNo){
        int result = qnaService.deleteQuestion(queNo);
        return result;
    }

    @GetMapping("/answer/view")
    public ResponseEntity<AnswerVO> selectAnswer(@RequestParam("queNo") int queNo){
        AnswerVO answerVO = qnaService.selectAnswer(queNo);
        return ResponseEntity.ok(answerVO);
    }

    @PostMapping("/answer/add")
    public int insertAnswer(@RequestBody AnswerVO answerVO){
        int result = qnaService.insertAnswer(answerVO);
        return result;
    }

    @GetMapping("/qna/private")
    public ResponseEntity<QuestionVO> getUserNoByQueId(@RequestParam("queNo") int queNo){
        QuestionVO questionVO = qnaService.getUserNoByQueNo(queNo);
        return ResponseEntity.ok(questionVO);
    }
}
