package test.Devops.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import test.Devops.model.Painter;
import test.Devops.repository.PainterRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class PainterService {
    
    private final PainterRepository painterRepository;
    
    public List<Painter> getAllPainters() {
        return painterRepository.findAll();
    }
    
    public Optional<Painter> getPainterById(Long id) {
        return painterRepository.findById(id);
    }
    
    public Optional<Painter> getPainterByName(String name) {
        return painterRepository.findByName(name);
    }
    
    public Painter createPainter(Painter painter) {
        if (painterRepository.existsByName(painter.getName())) {
            throw new RuntimeException("Painter with name already exists: " + painter.getName());
        }
        return painterRepository.save(painter);
    }
    
    public Painter updatePainter(Long id, Painter painterDetails) {
        Painter painter = painterRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Painter not found with id: " + id));
        
        painter.setName(painterDetails.getName());
        painter.setStyle(painterDetails.getStyle());
        
        return painterRepository.save(painter);
    }
    
    public void deletePainter(Long id) {
        Painter painter = painterRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Painter not found with id: " + id));
        painterRepository.delete(painter);
    }
}
