package kr.or.nextit.healthsignal.qna;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import java.util.ArrayList;

@CrossOrigin(origins = "*")
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class QnaController {
    private final QnaService qnaService;

    @PostMapping("/question/list")
    public ResponseEntity<List<QuestionVO>> selectQuestionList(@RequestBody QuestionVO questionVO) {
        List<QuestionVO> questionList = qnaService.selectQuestionList(questionVO);
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

    @PostMapping("/qna/count")
    public int selectQueCount(@RequestBody QuestionVO questionVO){
        int queCount = qnaService.selectQueCount(questionVO);
        return queCount;
    }

    // 첨부파일 저장하기
    @PostMapping("/question/file/upload")
    public ResponseEntity<?> uploadFiles(@RequestParam Map<String, MultipartFile> files) throws IOException {

        List<String> uploadedFileNames = new ArrayList<>();

        for (Map.Entry<String, MultipartFile> entry : files.entrySet()) {
            MultipartFile file = entry.getValue();
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            int dotIndex = originalFilename.lastIndexOf('.');
            if (dotIndex > 0) {
                extension = originalFilename.substring(dotIndex);
            }
            String uniqueFilename = UUID.randomUUID().toString() + extension;

            String filePath = System.getProperty("user.dir") + "\\src\\main\\HealthSignal\\public\\images\\qna\\que_file";
            File saveFile = new File(filePath, uniqueFilename);
            file.transferTo(saveFile);

            // 고유 파일 이름을 리스트에 추가
            uploadedFileNames.add(uniqueFilename);
        }

        // 저장된 모든 파일 이름을 응답으로 반환
        return ResponseEntity.ok().body(uploadedFileNames);
    }
}
