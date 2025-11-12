# Source Register Protocol

**Version:** 1.0  
**Last Updated:** 2025-01-23

> Timestamped, hashed citation ledger and folder structure.

## Purpose

Maintain a verifiable research trail with timestamped, hashed citations and organized folder structures.

## Protocol Structure

### Folder Structure

```
learnmappers-research/
├── sources/
│   ├── legal/
│   │   ├── statutes/
│   │   ├── regulations/
│   │   └── cases/
│   ├── credit/
│   │   ├── reports/
│   │   └── guides/
│   └── privacy/
│       ├── entities/
│       └── jurisdictions/
├── citations/
│   └── register.json
└── deliverables/
    └── [project-name]/
```

### Citation Format

```json
{
  "id": "citation-001",
  "timestamp": "2025-01-23T14:30:00Z",
  "hash": "sha256:abc123...",
  "source": {
    "type": "statute",
    "title": "UCC Article 3",
    "url": "https://...",
    "section": "3-104"
  },
  "folder": "sources/legal/statutes/ucc-article-3",
  "notes": "Primary source for negotiable instruments"
}
```

## Hashing Protocol

1. **Download** source document
2. **Generate** SHA-256 hash
3. **Timestamp** the citation
4. **Store** in register
5. **Link** to folder location

## File Naming

Format: `{type}-{identifier}-{date}.{ext}`

Examples:
- `statute-ucc-3-104-20250123.pdf`
- `guide-cfpb-credit-20250123.md`
- `chart-entity-comparison-20250123.png`

## Usage

This protocol applies to:
- **All studies** and research projects
- **Research documentation** and citations
- **Citation tracking** and verification

---

*This document is Exhibit D of the LearnMapverse Master Table.*

