"""
Interview Analysis Core Module

This module contains the core intelligence for interview analysis.
Separate from FastAPI for easier testing and extension.
"""

import re
from typing import List, Dict, Tuple
from dataclasses import dataclass

@dataclass
class Message:
    role: str
    content: str

class TranscriptAnalyzer:
    """Analyzes interview transcripts for communication and technical signals"""
    
    FILLER_WORDS = [
        "um", "uh", "like", "you know", "actually", "basically", 
        "literally", "just", "so", "kind of", "sort of"
    ]
    
    TECHNICAL_KEYWORDS = [
        "algorithm", "complexity", "optimization", "design", "architecture",
        "database", "api", "performance", "scalability", "testing",
        "deployment", "security", "authentication", "authorization",
        "cache", "queue", "async", "concurrent", "mutex", "semaphore",
        "microservice", "container", "kubernetes", "docker", "ci/cd",
        "rest", "graphql", "sql", "nosql", "index", "query", "transaction"
    ]
    
    EXPLANATION_MARKERS = [
        "because", "so that", "this helps", "used to",
        "in order to", "therefore", "as a result"
    ]
    
    def __init__(self):
        self.metrics = {}
    
    def analyze(self, transcript: List[Message]) -> Dict:
        """Main analysis entry point"""
        user_responses = self._extract_user_responses(transcript)
        
        self.metrics = {
            "total_words": self._count_words(user_responses),
            "total_sentences": self._count_sentences(user_responses),
            "user_responses_count": len(user_responses),
            "avg_response_length": self._avg_response_length(user_responses),
            "avg_sentence_length": self._avg_sentence_length(user_responses),
            "filler_count": self._count_fillers(user_responses),
            "filler_ratio": self._filler_ratio(user_responses),
            "technical_mentions": self._count_technical_terms(user_responses),
            "technical_density": self._technical_density(user_responses),
            "response_depth": self._assess_depth(user_responses),
            "explanation_count": self._count_explanations(user_responses),
            "concept_links": self._detect_concept_links(user_responses),
            "repetition_count": self._count_repetitions(user_responses),
            "lexical_diversity": self._calculate_lexical_diversity(user_responses),
        }
        
        # Add normalized metrics (critical for fair scoring across interview lengths)
        response_count = max(len(user_responses), 1)
        self.metrics["normalized_explanations"] = self.metrics["explanation_count"] / response_count
        self.metrics["normalized_links"] = self.metrics["concept_links"] / response_count
        self.metrics["normalized_repetitions"] = self.metrics["repetition_count"] / response_count
        
        return self.metrics
    
    def _extract_user_responses(self, transcript: List[Message]) -> List[str]:
        """Extract only user responses"""
        return [msg.content.lower() for msg in transcript if msg.role == "user"]
    
    def _count_words(self, responses: List[str]) -> int:
        """Count total words across all responses"""
        total = 0
        for response in responses:
            words = re.findall(r'\b\w+\b', response)
            total += len(words)
        return total
    
    def _count_sentences(self, responses: List[str]) -> int:
        """Count total sentences"""
        total = 0
        for response in responses:
            sentences = re.split(r'[.!?]+', response)
            total += len([s for s in sentences if s.strip()])
        return total
    
    def _avg_response_length(self, responses: List[str]) -> float:
        """Average words per response"""
        if not responses:
            return 0.0
        total_words = self._count_words(responses)
        return round(total_words / len(responses), 2)
    
    def _avg_sentence_length(self, responses: List[str]) -> float:
        """Average words per sentence"""
        total_words = self._count_words(responses)
        total_sentences = self._count_sentences(responses)
        if total_sentences == 0:
            return 0.0
        return round(total_words / total_sentences, 2)
    
    def _count_fillers(self, responses: List[str]) -> int:
        """Count filler words"""
        count = 0
        for response in responses:
            words = re.findall(r'\b\w+\b', response)
            for word in words:
                if word in self.FILLER_WORDS:
                    count += 1
        return count
    
    def _filler_ratio(self, responses: List[str]) -> float:
        """Filler word ratio"""
        total_words = self._count_words(responses)
        filler_count = self._count_fillers(responses)
        if total_words == 0:
            return 0.0
        return round(filler_count / total_words, 4)
    
    def _count_technical_terms(self, responses: List[str]) -> int:
        """Count technical terminology usage"""
        count = 0
        for response in responses:
            words = re.findall(r'\b\w+\b', response)
            for word in words:
                if word in self.TECHNICAL_KEYWORDS:
                    count += 1
        return count
    
    def _technical_density(self, responses: List[str]) -> float:
        """Technical keyword density"""
        total_words = self._count_words(responses)
        technical_count = self._count_technical_terms(responses)
        if total_words == 0:
            return 0.0
        return round(technical_count / total_words, 4)
    
    def _assess_depth(self, responses: List[str]) -> str:
        """Assess response depth category"""
        avg_length = self._avg_response_length(responses)
        if avg_length < 20:
            return "shallow"
        elif avg_length < 50:
            return "moderate"
        else:
            return "detailed"
    
    def _count_explanations(self, responses: List[str]) -> int:
        """Count explanation markers indicating reasoning"""
        count = 0
        for response in responses:
            text = response.lower()
            for marker in self.EXPLANATION_MARKERS:
                if marker in text:
                    count += 1
        return count
    
    def _detect_concept_links(self, responses: List[str]) -> int:
        """Detect patterns showing relationships between concepts"""
        patterns = [
            r"\b\w+\s+(improves|optimizes|increases|reduces)\s+\w+",
            r"\b\w+\s+is\s+used\s+for\s+\w+",
            r"\b\w+\s+helps\s+in\s+\w+"
        ]
        
        count = 0
        for response in responses:
            text = response.lower()
            for pattern in patterns:
                if re.search(pattern, text):
                    count += 1
        return count
    
    def _count_repetitions(self, responses: List[str]) -> int:
        """Count repeated phrases/sentences within and across responses"""
        seen = set()
        repeats = 0
        
        # Check for duplicate full responses
        for response in responses:
            text = response.lower().strip()
            if text in seen:
                repeats += 1
            else:
                seen.add(text)
        
        # Check for repeated sentences within responses
        for response in responses:
            sentences = re.split(r'[.!?]+', response.lower())
            sentences = [s.strip() for s in sentences if s.strip()]
            
            sentence_counts = {}
            for sent in sentences:
                if sent in sentence_counts:
                    repeats += 1
                else:
                    sentence_counts[sent] = 1
        
        return repeats
    
    def _calculate_lexical_diversity(self, responses: List[str]) -> float:
        """Calculate vocabulary diversity (unique words / total words) with length weighting"""
        words = []
        for response in responses:
            words.extend(re.findall(r'\b\w+\b', response.lower()))
        
        if not words:
            return 0.0
        
        unique_words = set(words)
        raw_diversity = len(unique_words) / len(words)
        
        # Apply weighting based on length to prevent short-answer gaming
        total_word_count = len(words)
        if total_word_count < 30:
            weight = 0.3  # Reduce impact for short answers
        else:
            weight = 1.0
        
        return round(raw_diversity * weight, 4)


class CommunicationScorer:
    """Scores communication skills based on metrics"""
    
    @staticmethod
    def score(metrics: Dict) -> Tuple[int, List[str], List[str]]:
        """Returns (score, strengths, weaknesses)"""
        score = 100
        strengths = []
        weaknesses = []
        
        if metrics["filler_ratio"] > 0.08:
            score -= 25
            weaknesses.append("Excessive use of filler words (um, uh, like)")
        elif metrics["filler_ratio"] > 0.05:
            score -= 15
            weaknesses.append("Moderate use of filler words")
        else:
            strengths.append("Clear communication with minimal filler words")
        
        if metrics["avg_response_length"] < 15:
            score -= 20
            weaknesses.append("Responses too brief, lacking detail")
        elif metrics["avg_response_length"] > 80:
            score -= 10
            weaknesses.append("Responses too lengthy, could be more concise")
        else:
            strengths.append("Well-balanced response length")
        
        if metrics["avg_sentence_length"] < 8:
            score -= 10
            weaknesses.append("Short sentences suggest choppy communication")
        elif metrics["avg_sentence_length"] > 25:
            score -= 10
            weaknesses.append("Overly long sentences, reduce complexity")
        else:
            strengths.append("Good sentence structure")
        
        if metrics["response_depth"] == "shallow":
            score -= 15
            weaknesses.append("Answers lack depth and elaboration")
        elif metrics["response_depth"] == "detailed":
            strengths.append("Provides detailed and thoughtful responses")
        
        return max(score, 0), strengths, weaknesses


class TechnicalScorer:
    """Weighted scoring model with normalized features (ML-engineered approach)"""
    
    @staticmethod
    def score(metrics: Dict) -> Tuple[int, List[str], List[str], str]:
        """
        Weighted scoring formula:
        score = 0.30 * technical_component +
                0.40 * reasoning_component +
                0.20 * structure_component +
                0.10 * quality_component
        """
        strengths = []
        weaknesses = []
        
        # Component 1: Technical Knowledge (30% weight)
        tech_score = TechnicalScorer._score_technical_knowledge(metrics, strengths, weaknesses)
        
        # Component 2: Reasoning Ability (40% weight - most important)
        reasoning_score = TechnicalScorer._score_reasoning(metrics, strengths, weaknesses)
        
        # Component 3: Structure & Coherence (20% weight)
        structure_score = TechnicalScorer._score_structure(metrics, strengths, weaknesses)
        
        # Component 4: Quality & Depth (10% weight)
        quality_score = TechnicalScorer._score_quality(metrics, strengths, weaknesses)
        
        # Weighted combination (Reasoning weighted most heavily)
        final_score = (
            0.25 * tech_score +
            0.50 * reasoning_score +
            0.15 * structure_score +
            0.10 * quality_score
        )
        
        # CRITICAL: Global repetition multiplier (catches spam that passes other checks)
        # If content is highly repetitive, apply global penalty
        if metrics["normalized_repetitions"] >= 1.0:
            # 100% repetition = 70% score reduction
            final_score *= 0.3
            weaknesses.append("Critical: Complete repetition destroys credibility")
        elif metrics["normalized_repetitions"] > 0.3:
            penalty_factor = min(0.7, metrics["normalized_repetitions"] * 1.5)
            final_score *= (1.0 - penalty_factor)
            weaknesses.append("Critical: High repetition severely impacts credibility")
        
        # ADVANCED: Detect explanation/link imbalance (gaming indicator)
        if (metrics["normalized_explanations"] > 4.0 and
            metrics["normalized_links"] > 0 and
            metrics["normalized_explanations"] / metrics["normalized_links"] >= 2.5):
            final_score *= 0.87
            weaknesses.append("Explanation/linking imbalance suggests surface-level understanding")
        
        # Calculate confidence
        confidence = TechnicalScorer._calculate_confidence(metrics)
        
        # Cap at realistic maximum (no perfect scores)
        final_score = min(final_score, 95)
        
        return int(final_score), strengths, weaknesses, confidence
    
    @staticmethod
    def _score_technical_knowledge(metrics: Dict, strengths: List[str], weaknesses: List[str]) -> float:
        """Score technical terminology usage (0-100)"""
        score = 70.0  # Start realistic, not 100
        
        density = metrics["technical_density"]
        
        if density < 0.02:
            score -= 40
            weaknesses.append("Very low technical content")
        elif density < 0.05:
            score -= 20
            weaknesses.append("Limited technical depth")
        elif density > 0.8:
            score -= 30
            weaknesses.append("Pure keyword spam without context")
        elif density > 0.6:
            score -= 15
            weaknesses.append("Overuse of keywords without substance")
        elif density >= 0.05 and density <= 0.3:
            score += 20
            strengths.append("Good use of technical terms")
        
        # Signal consistency check: keywords without connections = superficial
        if density > 0.3 and metrics["normalized_links"] < 0.5:
            score -= 15
            weaknesses.append("Uses terms without connecting concepts")
        
        return max(score, 0)
    
    @staticmethod
    def _score_reasoning(metrics: Dict, strengths: List[str], weaknesses: List[str]) -> float:
        """Score explanation and conceptual linking (0-100) - MOST IMPORTANT"""
        score = 60.0  # Start lower - reasoning must be earned
        
        norm_explanations = metrics["normalized_explanations"]
        norm_links = metrics["normalized_links"]
        
        # Smooth penalty for explanations (no hard jumps)
        if norm_explanations < 2.0:
            penalty = (2.0 - norm_explanations) * 15
            score -= penalty
            if norm_explanations < 1.0:
                weaknesses.append("Lacks explanation and reasoning")
            else:
                weaknesses.append("Limited reasoning depth")
        elif norm_explanations >= 2.0 and norm_explanations <= 5.0:
            score += 25
            strengths.append("Provides reasoning behind answers")
        elif norm_explanations > 5.0:
            score -= 20
            weaknesses.append("Suspicious pattern - over-structured")
        
        # Concept linking (weighted heavily)
        if norm_links < 1.0:
            penalty = (1.0 - norm_links) * 20
            score -= penalty
            weaknesses.append("Does not connect concepts clearly")
        elif norm_links >= 1.0 and norm_links <= 5.0:
            score += 30
            strengths.append("Strong understanding of concept relationships")
        elif norm_links > 5.0:
            score -= 15
            weaknesses.append("Repetitive linking pattern")
        
        # CRITICAL: Artificial structure detection (catches gaming)
        # Many explanations BUT not proportional linking = fluent but hollow
        if norm_explanations > 3.0 and norm_links < 2.0:
            score -= 30
            weaknesses.append("Overuse of generic explanations without depth")
        
        # Advanced gaming detection: high structure but low technical substance
        if norm_explanations > 3.0 and metrics["technical_density"] < 0.15:
            score -= 25
            weaknesses.append("Fluent structure but lacks technical substance")
        
        return max(score, 0)
    
    @staticmethod
    def _score_structure(metrics: Dict, strengths: List[str], weaknesses: List[str]) -> float:
        """Score answer structure and coherence (0-100)"""
        score = 70.0  # Baseline structure score
        
        # Length-based assessment
        total_words = metrics["total_words"]
        
        if total_words < 15:
            score -= 50
            weaknesses.append("Extremely brief - insufficient elaboration")
        elif total_words < 30:
            score -= 25
            weaknesses.append("Short answers lack depth")
        elif total_words >= 50:
            score += 15
        
        # Repetition penalty (smooth)
        norm_reps = metrics["normalized_repetitions"]
        if norm_reps > 0:
            penalty = min(30, norm_reps * 25)
            score -= penalty
            weaknesses.append("Repetitive content - lacks variety")
        
        # Lexical diversity (only for longer answers)
        if total_words >= 20:
            diversity = metrics["lexical_diversity"]
            if diversity < 0.4:
                score -= 20
                weaknesses.append("Limited vocabulary diversity")
            elif diversity > 0.7:
                score += 15
                strengths.append("Rich and varied vocabulary")
        
        return max(score, 0)
    
    @staticmethod
    def _score_quality(metrics: Dict, strengths: List[str], weaknesses: List[str]) -> float:
        """Score overall quality indicators (0-100)"""
        score = 60.0  # Base quality score
        
        if metrics["response_depth"] == "shallow":
            score -= 35
            weaknesses.append("Superficial answers")
        elif metrics["response_depth"] == "moderate":
            score += 10
        elif metrics["response_depth"] == "detailed":
            score += 30
            strengths.append("Detailed and thoughtful responses")
        
        # Bonus for exceptional performance (hard to achieve)
        if (metrics["normalized_explanations"] >= 2.5 and
            metrics["normalized_links"] >= 1.5 and
            metrics["lexical_diversity"] > 0.7 and
            metrics["normalized_repetitions"] == 0 and
            metrics["total_words"] >= 60):
            score += 15
            strengths.append("Exceptional technical communication")
        
        return max(score, 0)
    
    @staticmethod
    def _calculate_confidence(metrics: Dict) -> str:
        """Calculate confidence based on normalized signal agreement"""
        signals = [
            metrics["technical_density"] > 0.05,
            metrics["normalized_explanations"] > 1.0,
            metrics["normalized_links"] > 0.5,
            metrics["normalized_repetitions"] == 0,
            metrics["total_words"] >= 30
        ]
        
        signal_count = sum(signals)
        
        if signal_count >= 4:
            return "high"
        elif signal_count >= 2:
            return "medium"
        else:
            return "low"


class FeedbackGenerator:
    """Generates human-readable feedback"""
    
    @staticmethod
    def generate(metrics: Dict, comm_score: int, tech_score: int,
                 strengths: List[str], weaknesses: List[str]) -> str:
        """Generate detailed feedback text"""
        lines = []
        
        lines.append(f"Communication Score: {comm_score}/100")
        lines.append(f"Technical Score: {tech_score}/100")
        lines.append(f"\nYou provided {metrics['user_responses_count']} responses with an average of {metrics['avg_response_length']} words per response.")
        
        if metrics["filler_ratio"] > 0.05:
            lines.append(f"\n⚠️ Filler Word Usage: {metrics['filler_ratio']*100:.1f}% of your speech consists of filler words. Work on reducing 'um', 'uh', and 'like'.")
        
        if metrics["technical_density"] < 0.05:
            lines.append(f"\n⚠️ Technical Depth: Your responses contain limited technical terminology. Demonstrate deeper technical understanding.")
        
        if metrics["response_depth"] == "shallow":
            lines.append(f"\n⚠️ Response Depth: Your answers are too brief. Elaborate more on your thought process and implementation details.")
        
        return "\n".join(lines)
    
    @staticmethod
    def get_improvements(weaknesses: List[str]) -> List[str]:
        """Map weaknesses to actionable improvements"""
        improvements = []
        
        if any("filler" in w.lower() for w in weaknesses):
            improvements.append("Practice speaking with pauses instead of filler words")
            improvements.append("Record yourself and count filler words to build awareness")
        
        if any("brief" in w.lower() or "shallow" in w.lower() or "depth" in w.lower() for w in weaknesses):
            improvements.append("Use the STAR method (Situation, Task, Action, Result) for answers")
            improvements.append("Add concrete examples and numbers to your responses")
        
        if any("technical" in w.lower() for w in weaknesses):
            improvements.append("Study core technical concepts and practice explaining them")
            improvements.append("Use technical terminology naturally in your responses")
        
        if any("sentence" in w.lower() for w in weaknesses):
            improvements.append("Practice clear, structured communication")
            improvements.append("Break complex ideas into digestible points")
        
        return improvements if improvements else [
            "Continue practicing mock interviews",
            "Focus on clarity and confidence"
        ]


def calculate_overall_score(comm_score: int, tech_score: int) -> int:
    """Weighted overall score (40% comm, 60% tech)"""
    return int(comm_score * 0.4 + tech_score * 0.6)
