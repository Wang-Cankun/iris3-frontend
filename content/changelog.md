---
title: Changelog
description: 'DeepMAPS Changes'
---

# Change Log

All notable changes to DeepMAPS will be documented in this page.


## [0.6] - 05/18/2021
 
### Added

- Complete workflow to calculate regulons
- Add error message when selecting same clusters for differential analysis
- 
### Changes

- Updated regulon page layout
- Changed network default design
- Changed card title design

### Fixed

- Loading texts
- Only highlight selected regulons

## [0.5] - 05/13/2021
 
### Added

- Cytoscape: select to highlight genes; reset network; export to JPG, PNG, or CSV
- Example regulon activity
- Example regulon gene expression
- Gene set enrichment analysis using EnrichR
- Example regulon heatmap

### Changes

- Update regulon page layout
- Loading page design to display progress

### Fixed

- Data table to auto adjust card height


## [0.4] - 05/06/2021
 
### Added

- Show job running progess during loading, utilized socket-io and redis
- Show file upload progress during loading
- Allow download figures and tables
- Interactive scatter plot for clustering and gene expression

### Changes

- Updated all grid items with the same header/title style

### Fixed

- Too many digits in DEG results
- Align the 'RENAME' button within settings section
- Update info not clear
- Example data naming error
- Set default clustering method to HGT

## [0.3] - 04/29/2021

### Added

- Allow users to upload custom dataset
- Run custom datasets on single dataset mode, multiple datasets mode, 10x matched scRNA+ATAC-seq mode
- Built Docker images for R and Python backend

### Changes

- Use [JASPAR binding sites database](http://jaspar.genereg.net/genome-tracks/) for motif tasks
- Updated new HGT backend workflow

### Fixed

- API returns too many digits of data
- Replaced example cell label with healthy/disease
- Renamed gene regulatory network title
- Minor typos and layout changes

## [0.2] - 04/15/2021

### Added

- Options to select assay in plotting genes and DEGs
- GAS assay and using HGT clusters for default in matched data
- p-value cutoff in DEGs
- Example network and basic settings adjustment using Cytoscape.js
- 7 graph layout algorithms in Cytoscape.js
- Connected HGT logic in backend server
- Coverage plot in matched data
- Enable 'group by' option in generating violin plots
- Enable search function in variable genes table

### Fixed

- Static plot to adjust based on grid item resize event
- Gene-gene correlation function not working

## [0.1] - 04/01/2021

DeepMAPS is online at [https://bmbls.bmi.osumc.edu/deepmaps/](https://bmbls.bmi.osumc.edu/deepmaps/)

### Added

- Allow partial select cell labels or genes for regulon inference
- New homepage UI design
- Redis message queue
- R package for API calling
- Interactive Boxplot & Bar plot