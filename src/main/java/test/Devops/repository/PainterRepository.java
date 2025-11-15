package test.Devops.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import test.Devops.model.Painter;

import java.util.Optional;

@Repository
public interface PainterRepository extends JpaRepository<Painter, Long> {
    Optional<Painter> findByName(String name);
    boolean existsByName(String name);
}
