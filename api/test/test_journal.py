from fastapi.testclient import TestClient
from main import app
from models import JournalIn, JournalOut
from queries.journals import JournalQueries

client = TestClient(app)


class MockJournalsQuery:
    def create(self, journal: JournalIn) -> JournalOut:
        return JournalOut(**journal.dict(), id="mocked_journal_id")


def test_create_journal_test():
    app.dependency_overrides[JournalQueries] = MockJournalsQuery()
    journal_data = {
        "title": "Test Journal",
        "description": "This is a test journal.",
        "picture": "https://upload.wikimedia.org/wikipedia/commons/2/28/Red_rose.jpg",
    }
    response = client.post("/journals")
    data = response.json()
    assert data.status_code == 200
    created_journal = response.json()
    assert "id" in created_journal
    assert created_journal["title"] == journal_data["title"]
    assert created_journal["description"] == journal_data["description"]
    assert created_journal["picture"] == journal_data["picture"]
