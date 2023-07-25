from fastapi.testclient import TestClient
from main import app
from models import JournalIn, JournalOut, TaskOut
from queries.journals import JournalQueries
from queries.tasks import TasksQueries
import json


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
            )
        ]

    def delete(self, journal_id):
        return JournalOut(
            id=1,
            title="title",
            description="description",
            created_on="2023-07-10T16:56:35.525+00:00",
            picture="picture",
        )


class MockTasksQuery:
    def get_all(self):
        return [
            TaskOut(
                id=1,
                title="title",
                description="description",
                due_date="2023-07-10T16:56:35.525+00:00",
            )
        ]


def test_create_journal_test():
    app.dependency_overrides[JournalQueries] = MockJournalsQuery
    journal_data = {
        "created_on": "2023-07-10T16:56:35.525+00:00",
        "title": "Test Journal",
        "description": "This is a test journal.",
        "picture": "https://tinyurl.com/ykv3jaw6",
    }
    response = client.post("/journals", json.dumps(journal_data))
    print(response)
    assert response.status_code == 200
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
        }
    ]


def test_get__all_tasks():
    # Arrange
    app.dependency_overrides[TasksQueries] = MockTasksQuery
    # Act
    response = client.get("/tasks")
    # Clean up
    app.dependency_overrides = {}
    # Assert
    assert response.status_code == 200
    assert response.json() == [
        {
            "id": "1",
            "title": "title",
            "description": "description",
            "due_date": "2023-07-10T16:56:35.525000+00:00",
        }
    ]


def test_delete_journal():
    # Arrange
    app.dependency_overrides[JournalQueries] = MockJournalsQuery
    # Act
    response = client.delete("/journals/1")
    # Clean up
    app.dependency_overrides = {}
    # Assert
    assert response.status_code == 200
    assert response.json() is True
