from fastapi.testclient import TestClient
from main import app
from models import JournalIn, JournalOut
from queries.journals import JournalQueries


client = TestClient(app)


class MockJournalsQuery:
    def create(self, journal: JournalIn) -> JournalOut:
        return JournalOut(**journal.dict(), id="mocked_journal_id")

    def get_all(self):
        return [
            JournalOut(
                id=1,
                title="title",
                description="description",
                created_on="2023-07-10T16:56:35.525+00:00",
                picture="picture",
            ),
            JournalOut(
                id=2,
                title="title",
                description="description",
                created_on="2023-07-10T16:56:35.525+00:00",
                picture="picture",
            ),
        ]


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


def test_get_all_journals():
    # Arrange
    app.dependency_overrides[JournalQueries] = MockJournalsQuery
    # Act
    response = client.get("/journals")
    # Clean up
    app.dependency_overrides = {}
    # Assert
    assert response.status_code == 200
    assert response.json() == [
        {
            "id": "1",
            "created_on": "2023-07-10T16:56:35.525000+00:00",
            "title": "title",
            "description": "description",
            "picture": "picture",
        },
        {
            "id": "2",
            "created_on": "2023-07-10T16:56:35.525000+00:00",
            "title": "title",
            "description": "description",
            "picture": "picture",
        },
    ]
