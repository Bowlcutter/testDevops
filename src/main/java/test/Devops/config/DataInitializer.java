package test.Devops.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import test.Devops.model.Artwork;
import test.Devops.model.Painter;
import test.Devops.repository.ArtworkRepository;
import test.Devops.repository.PainterRepository;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    
    private final PainterRepository painterRepository;
    private final ArtworkRepository artworkRepository;
    
    @Override
    public void run(String... args) {
        // only seed if database is empty
        if (painterRepository.count() == 0) {
            seedPaintersAndArtworks();
        }
    }
    
    private void seedPaintersAndArtworks() {
        // painter 1: Bo - Abstract
        Painter bo = new Painter();
        bo.setName("Bo");
        bo.setStyle("Abstract");
        bo = painterRepository.save(bo);
        
        Artwork shapes = new Artwork();
        shapes.setTitle("Random Shapes");
        shapes.setSecretPrice(12000);
        shapes.setImageUrl("/images/shapes.jpg");
        shapes.setPainter(bo);
        artworkRepository.save(shapes);
        
        Artwork storm = new Artwork();
        storm.setTitle("Storm");
        storm.setSecretPrice(8000);
        storm.setImageUrl("/images/storm.jpg");
        storm.setPainter(bo);
        artworkRepository.save(storm);
        
        // painter 2: Christian - Realism
        Painter christian = new Painter();
        christian.setName("Christian");
        christian.setStyle("Realism");
        christian = painterRepository.save(christian);
        
        Artwork sunset = new Artwork();
        sunset.setTitle("Sunset Over Lake");
        sunset.setSecretPrice(15000);
        sunset.setImageUrl("/images/sunsetoverlake.jpg");
        sunset.setPainter(christian);
        artworkRepository.save(sunset);
        
        Artwork barn = new Artwork();
        barn.setTitle("Barn");
        barn.setSecretPrice(9500);
        barn.setImageUrl("/images/barn.jpg");
        barn.setPainter(christian);
        artworkRepository.save(barn);
        
        // painter 3: Hank - Hills
        Painter hank = new Painter();
        hank.setName("Hank");
        hank.setStyle("Hills");
        hank = painterRepository.save(hank);
        
        Artwork greenHills = new Artwork();
        greenHills.setTitle("Green Hills");
        greenHills.setSecretPrice(9000);
        greenHills.setImageUrl("/images/greenhills.jpg");
        greenHills.setPainter(hank);
        artworkRepository.save(greenHills);
        
        Artwork snowyHills = new Artwork();
        snowyHills.setTitle("Snowy Hills");
        snowyHills.setSecretPrice(8000);
        snowyHills.setImageUrl("/images/snowyhills.jpg");
        snowyHills.setPainter(hank);
        artworkRepository.save(snowyHills);
        
        Artwork darkHills = new Artwork();
        darkHills.setTitle("Dark Hills");
        darkHills.setSecretPrice(7000);
        darkHills.setImageUrl("/images/darkhills.jpg");
        darkHills.setPainter(hank);
        artworkRepository.save(darkHills);
        
        Artwork dryHills = new Artwork();
        dryHills.setTitle("Dry Hills");
        dryHills.setSecretPrice(6000);
        dryHills.setImageUrl("/images/dryhills.jpg");
        dryHills.setPainter(hank);
        artworkRepository.save(dryHills);
        
        System.out.println("Database seeded with " + painterRepository.count() + " painters and " + artworkRepository.count() + " artworks!");
    }
}
