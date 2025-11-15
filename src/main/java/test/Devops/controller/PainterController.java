package test.Devops.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import test.Devops.model.Painter;
import test.Devops.service.PainterService;

import java.util.List;

@RestController
@RequestMapping("/api/painters")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PainterController {
    
    private final PainterService painterService;
    
    @GetMapping
    public ResponseEntity<List<Painter>> getAllPainters() {
        return ResponseEntity.ok(painterService.getAllPainters());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Painter> getPainterById(@PathVariable Long id) {
        return painterService.getPainterById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/name/{name}")
    public ResponseEntity<Painter> getPainterByName(@PathVariable String name) {
        return painterService.getPainterByName(name)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Painter> createPainter(@Valid @RequestBody Painter painter) {
        try {
            Painter createdPainter = painterService.createPainter(painter);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPainter);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Painter> updatePainter(@PathVariable Long id, @Valid @RequestBody Painter painter) {
        try {
            Painter updatedPainter = painterService.updatePainter(id, painter);
            return ResponseEntity.ok(updatedPainter);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePainter(@PathVariable Long id) {
        try {
            painterService.deletePainter(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
