<div id="search-results" class="page page--full-width program-listing" data-t4-ajax-group="courseSearch" role="main">
  <article class="listing-page">
    <section class="su-listing">
      <div class="grid-container">
        <?php if (!empty($results)) : ?>
        <?php foreach ($results as $item) : ?>
        <article class="program-listing--item">
          <div class="program-listing--text-set__first text-margin-reset">

            <h3 class="h4 funderline"><a href="<?php echo $item['programURL']; ?>"><?php echo $item['programTitle']; ?></a></h3>

            <!-- <p><?php echo $item['programSummary']; ?></p> -->

            <!-- <div class="tags tags__links">
              <h4 class="tags__heading show-for-sr">Tags:</h4>
              <ul>
                <?php tags_list($item['programFeatures'], $all_programs_section, 'programLevel', '|'); ?>
              </ul>
            </div> -->

          </div>

          <div class="program-listing--text-set__second text-margin-reset">

            <div class="program-types">
              <ul>
                <?php foreach (explode('|', $item['programType']) as $programType) : ?>
                <li><?php echo $programType; ?></li>
                <?php endforeach; ?>
              </ul>
            </div>
          </div>

          <div class="program-listing--text-set__third">
            <div class="program-listing--checkbox">
              <input type="checkbox" id="checkbox-<?php echo $item['contentID']; ?>">
              <label for="checkbox-<?php echo $item['contentID']; ?>">Compare</label>
            </div>
            <a href="#sticky-panel" class="show-for-sr">Jump to the comparison panel</a>

          </div>

          <div class="program-listing--fields">

            <div class="program--level"><?php echo $item['programLevel']; ?></div>
            <div class="program--name"><?php echo $item['programTitle']; ?></div>
            <!-- <div class="program--summary"><?php echo $item['programSummary']; ?></div> -->
            <div class="program--types">
              <ul>
                <?php foreach (explode('|', $item['programType']) as $programType) : ?>
                <li><?php echo $programType; ?></li>
                <?php endforeach; ?>
              </ul>
            </div>
            <div class="program--degrees">
              <ul>
                <?php foreach (explode('|', $item['Disciplines']) as $degree) : ?>
                <li><?php echo $degree; ?></li>
                <?php endforeach; ?>
              </ul>
            </div>
            <div class="program--duration"><?php echo $item['programTerm']; ?></div>
            <!-- <div class="program--credits"><?php echo $item['credits']; ?></div> -->
            <!-- <div class="program--format"><?php echo $item['learningFormat']; ?></div> -->
            <div class="program--areas-of-study">
              <ul>
                <?php foreach (explode('|', $item['programFieldofStudy']) as $areaOfStudy) : ?>
                <li><?php echo $areaOfStudy; ?></li>
                <?php endforeach; ?>
              </ul>
            </div>
            <div class="program--url"><?php echo $item['programURL']; ?></div>
          </div>
        </article>
        <?php endforeach; ?>        
        <div class="pagination-box">
          <?php if (isset($paginationArray)) : ?>
          <div class="pagination-pages">
            <nav aria-label="pagination" class="pagination" data-t4-ajax-link="normal" data-t4-scroll="true">
              <?php foreach ($paginationArray as $paginationItem) : ?>
                <?php if ($paginationItem['current']) : ?>
                    <span class="currentpage"><a href=""><?php echo $paginationItem['text']; ?></a></span>
                <?php else : ?>
                    <a href="<?php echo $paginationItem['href']; ?>" class="<?php echo $paginationItem['class']; ?>">
                        <?php echo $paginationItem['text']; ?>
                    </a>
                <?php endif;?>
              <?php endforeach; ?>
            </nav>
          </div>
          <?php endif; ?>
        </div>
        <?php else : ?>
        <p style="text-align: center; padding: 30px; font-weight: bold;">No Results Found</p>
        <?php endif; ?>
      </div>
    </section>
  </article>
</div>