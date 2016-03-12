<?php
/**
 * Created by PhpStorm.
 * User: dario
 * Date: 12.03.2016
 * Time: 14:27
 */

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="users")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @var string
     *
     * @ORM\Column(name="first_name", type="string", length=255)
     * @Assert\NotBlank(groups={"Registration", "Profile"})
     */
    protected $firstName;

    /**
     * @var string
     *
     * @ORM\Column(name="last_name", type="string", length=255)
     * @Assert\NotBlank(groups={"Registration", "Profile"})
     */
    protected $lastName;

    /**
     * @var string
     *
     * @ORM\Column(name="nationality", type="string", length=255)
     * @Assert\NotBlank(groups={"Registration", "Profile"})
     * @Assert\Country()
     */
    protected $nationality;

    /**
     * @var string
     *
     * @ORM\Column(name="city", type="string", length=255, nullable=true)
     * @Assert\NotBlank(groups={"Registration", "Profile"})
     */
    protected $city;

    /**
     * @var string
     *
     * @ORM\Column(name="language", type="string", length=255)
     * @Assert\NotBlank(groups={"Registration", "Profile"})
     * @Assert\Language()
     *
     */
    protected $language;

    /**
     * @var LearningLanguage
     *
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\LearningLanguage", mappedBy="user")
     */
    protected $learningLanguages;

    /**
     * @var string
     *
     * @ORM\Column(name="reputation", type="decimal", scale=2, precision=3)
     */
    protected $reputation;

    /**
     * @var integer
     *
     * @ORM\Column(name="number_of_voters", type="integer")
     */
    protected $numberOfVoters;

    /**
     * @var User
     *
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\User")
     * @ORM\OrderBy({"lastName" = "ASC"})
     */
    protected $friends;


    public function __construct()
    {
        parent::__construct();

        $this->reputation = '0.0';
        $this->numberOfVoters = 0;
        $this->learningLanguages = new ArrayCollection();
        $this->friends = new ArrayCollection();
    }

    /**
     * Set firstName
     *
     * @param string $firstName
     *
     * @return User
     */
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;

        return $this;
    }

    /**
     * Get firstName
     *
     * @return string
     */
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * Set lastName
     *
     * @param string $lastName
     *
     * @return User
     */
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * Get lastName
     *
     * @return string
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * Set nationality
     *
     * @param string $nationality
     *
     * @return User
     */
    public function setNationality($nationality)
    {
        $this->nationality = $nationality;

        return $this;
    }

    /**
     * Get nationality
     *
     * @return string
     */
    public function getNationality()
    {
        return $this->nationality;
    }

    /**
     * Set city
     *
     * @param string $city
     *
     * @return User
     */
    public function setCity($city)
    {
        $this->city = $city;

        return $this;
    }

    /**
     * Get city
     *
     * @return string
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * Set language
     *
     * @param string $language
     *
     * @return User
     */
    public function setLanguage($language)
    {
        $this->language = $language;

        return $this;
    }

    /**
     * Get language
     *
     * @return string
     */
    public function getLanguage()
    {
        return $this->language;
    }

    /**
     * Set reputation
     *
     * @param string $reputation
     *
     * @return User
     */
    public function setReputation($reputation)
    {
        $this->reputation = $reputation;

        return $this;
    }

    /**
     * Get reputation
     *
     * @return string
     */
    public function getReputation()
    {
        return $this->reputation;
    }

    /**
     * Set numberOfVoters
     *
     * @param integer $numberOfVoters
     *
     * @return User
     */
    public function setNumberOfVoters($numberOfVoters)
    {
        $this->numberOfVoters = $numberOfVoters;

        return $this;
    }

    /**
     * Get numberOfVoters
     *
     * @return integer
     */
    public function getNumberOfVoters()
    {
        return $this->numberOfVoters;
    }

    /**
     * Add learningLanguage
     *
     * @param \AppBundle\Entity\LearningLanguage $learningLanguage
     *
     * @return User
     */
    public function addLearningLanguage(\AppBundle\Entity\LearningLanguage $learningLanguage)
    {
        $this->learningLanguages[] = $learningLanguage;

        return $this;
    }

    /**
     * Remove learningLanguage
     *
     * @param \AppBundle\Entity\LearningLanguage $learningLanguage
     */
    public function removeLearningLanguage(\AppBundle\Entity\LearningLanguage $learningLanguage)
    {
        $this->learningLanguages->removeElement($learningLanguage);
    }

    /**
     * Get learningLanguages
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getLearningLanguages()
    {
        return $this->learningLanguages;
    }

    /**
     * Add friend
     *
     * @param \AppBundle\Entity\User $friend
     *
     * @return User
     */
    public function addFriend(\AppBundle\Entity\User $friend)
    {
        $this->friends[] = $friend;

        return $this;
    }

    /**
     * Remove friend
     *
     * @param \AppBundle\Entity\User $friend
     */
    public function removeFriend(\AppBundle\Entity\User $friend)
    {
        $this->friends->removeElement($friend);
    }

    /**
     * Get friends
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getFriends()
    {
        return $this->friends;
    }
}
